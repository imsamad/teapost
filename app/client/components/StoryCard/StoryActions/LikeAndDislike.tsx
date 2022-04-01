import { useDisclosure } from "@chakra-ui/react";
import { useAuthCtx, useProfile } from "@compo/Context";
import TSButton from "@compo/UI/TSButton";
import { likeOrDislikeStory } from "@lib/api/storyApi";
import React, { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";

const LikeAndDislike = ({
  storyId,
  like,
  dislike,
  size,
  displayFull,
}: {
  storyId: string;
  like: number;
  dislike: number;
  size: string;
  displayFull?: boolean;
}) => {
  const { myProfile, mutateProfile } = useProfile();

  const [grade, setGrade] = useState({
    like,
    dislike,
    hadBeenLiked: false,
    hadBeenDisLiked: false,
  });

  useEffect(
    () => {
      setGrade((pre) => ({
        ...pre,
        hadBeenLiked: !!myProfile?.likedStories?.includes(storyId),
        hadBeenDisLiked: !!myProfile?.dislikedStories?.includes(storyId),
      }));

      if (!!myProfile?.likedStories?.includes(storyId) && grade.like == 0) {
        setGrade((pre) => ({ ...pre, like: 1 }));
      }
      if (
        !!myProfile?.dislikedStories?.includes(storyId) &&
        grade.dislike == 0
      ) {
        setGrade((pre) => ({ ...pre, dislike: 1 }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myProfile]
  );

  const loading = useDisclosure();
  const { openLoginToast } = useAuthCtx();
  const handleGrade = async (isLike = true) => {
    if (!myProfile?._id) {
      openLoginToast();
      return;
    }
    loading.onOpen();

    const data = await likeOrDislikeStory({
      storyId,
      undo: isLike ? grade.hadBeenLiked : grade.hadBeenDisLiked,
      isLike,
    });
    if (data) {
      // console.log("like ", data.story.noOfLikes);
      // console.log("dislike ", data.story.noOfDislikes);
      await mutateProfile();
      setGrade((pre: any) => ({
        ...pre,
        like: data.story.noOfLikes,
        dislike: data.story.noOfDislikes,
      }));
      loading.onClose();
    } else loading.onClose();
  };

  return (
    <>
      <TSButton
        onClick={() => handleGrade(true)}
        isDisabled={loading.isOpen}
        isActive={grade.hadBeenLiked}
        _active={{
          border: "1px solid blue",
          color: "blue",
        }}
        leftIcon={<BiLike />}
        size={size}
        variant={displayFull ? "outline" : "solid"}
        colorScheme={displayFull ? "purple" : "gray"}
      >
        {grade.like}
      </TSButton>

      <TSButton
        isDisabled={loading.isOpen}
        isActive={grade.hadBeenDisLiked}
        _active={{
          border: "1px solid pink",
          color: "pink",
        }}
        leftIcon={<BiDislike />}
        size={size}
        variant={displayFull ? "outline" : "solid"}
        colorScheme={displayFull ? "purple" : "gray"}
        onClick={() => handleGrade(false)}
      >
        {grade.dislike}
      </TSButton>
    </>
  );
};

export default LikeAndDislike;
