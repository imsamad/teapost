import { useState, memo, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  useDisclosure,
  useToast,
  IconButton,
} from "@chakra-ui/react";

import { BiLike, BiDislike } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { FiFileMinus } from "react-icons/fi";
import { useUICtx, useProfile } from "../../Context";
import { gradeStory } from "../../../lib/createStory";

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
  const { login } = useUICtx();
  const handleGrade = async (isActionTypeLike = true) => {
    if (!profile?.user) {
      toast({
        duration: 2000,
        isClosable: true,
        render: customToast(login.onOpen),
      });
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
    </ButtonGroup>
  );
};

export default memo(Index);

// eslint-disable-next-line react/display-name
const customToast = (onClick: any) => () => {
  return (
    <HStack
      bgColor="gray.300"
      border="1px solid #ddd"
      p="8px"
      borderRadius="md"
      justifyContent="space-between"
    >
      <Heading
        fontSize="sm"
        _dark={{
          color: "black",
        }}
      >
        You are not logged in.
      </Heading>
      <Button size="sm" color="white" p={3} bg="blue.500" onClick={onClick}>
        Login
      </Button>
    </HStack>
  );
};
