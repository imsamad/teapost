import { useState, memo, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  useDisclosure,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { BiLike, BiDislike, BiCommentAdd } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";

import { useUICtx, useProfile, useAuthCtx } from "@compo/Context";
import { gradeStory } from "@lib/api/storyApi";
import customToast from "../customToast";

const Index = ({ storyId, like, dislike }: any) => {
  const { profile, mutateProfile } = useProfile();
  const [grade, setGrade] = useState({
    like: profile?.likedStories?.includes(storyId) && like === 0 ? 1 : like,
    dislike:
      profile?.dislikedStories?.includes(storyId) && dislike === 0
        ? 1
        : dislike,
    hadBeenLiked: profile?.likedStories?.includes(storyId),
    hadBeenDisLiked: profile?.dislikedStories?.includes(storyId),
  });

  useEffect(() => {
    setGrade((pre: any) => ({
      ...pre,
      hadBeenLiked: profile?.likedStories?.includes(storyId),
      hadBeenDisLiked: profile?.dislikedStories?.includes(storyId),
    }));
    // These two coditron in case if story render with like or dislike 0 , user liked then before it data revalidate set like or dislike 1
    if (profile?.likedStories?.includes(storyId) && like === 0) {
      setGrade((pre: any) => ({
        ...pre,
        like: 1,
      }));
    }
    if (profile?.dislikedStories?.includes(storyId) && dislike === 0) {
      setGrade((pre: any) => ({
        ...pre,
        dislike: 1,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const loading = useDisclosure();
  const toast = useToast();
  const { openLoginToast } = useAuthCtx();
  const { drawer, comment } = useUICtx();
  const handleGrade = async (isActionTypeLike = true) => {
    if (!profile?._id) {
      openLoginToast();
      return;
    }
    loading.onOpen();
    const axiosData = isActionTypeLike
      ? {
          like: grade.hadBeenLiked ? 0 : 1,
        }
      : {
          dislike: grade.hadBeenDisLiked ? 0 : 1,
        };
    const data = await gradeStory(storyId, axiosData);

    if (data) {
      setGrade((pre: any) => ({
        ...pre,
        like: data.storyMeta.like,
        dislike: data.storyMeta.dislike,
      }));
      const res = await mutateProfile();
      loading.onClose();
    } else loading.onClose();
  };

  return (
    <ButtonGroup spacing={3} alignItems="center">
      <Button
        onClick={() => handleGrade(true)}
        isDisabled={loading.isOpen}
        isActive={grade.hadBeenLiked}
        _active={{
          border: "1px solid blue",
          color: "blue",
        }}
        _focus={{
          border: "1px solid gray",
          bgColor: "transparent",
          boxShadow: "none",
          WebkitTapHighlightColor: "none",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          MozBackfaceVisibility: "hidden",
        }}
        leftIcon={<BiLike />}
        size="xs"
        fontSize="10px"
        variant="solid"
      >
        {grade.like}
      </Button>

      <Button
        isDisabled={loading.isOpen}
        isActive={grade.hadBeenDisLiked}
        _active={{
          border: "1px solid pink",
          color: "pink",
        }}
        _focus={{
          border: "1px solid gray",
          bgColor: "transparent",
          boxShadow: "none",
          WebkitTapHighlightColor: "transparent",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          MozBackfaceVisibility: "hidden",
        }}
        leftIcon={<BiDislike />}
        size="xs"
        fontSize="10px"
        variant="solid"
        onClick={() => handleGrade(false)}
      >
        {grade.dislike}
      </Button>
      <IconButton
        onClick={() => {
          drawer.onOpen(storyId);
        }}
        _active={{
          outline: "none",
        }}
        _focus={{
          border: "1px solid gray",
          bgColor: "transparent",
          boxShadow: "none",
          WebkitTapHighlightColor: "transparent",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          MozBackfaceVisibility: "hidden",
        }}
        icon={<AiFillFileAdd fontSize="19px" />}
        size="xs"
        aria-label="add to reading list"
      />
      <IconButton
        aria-label="comment"
        size="xs"
        icon={<BiCommentAdd />}
        onClick={() => comment.onOpen(storyId)}
      />
    </ButtonGroup>
  );
};

export default memo(Index);
