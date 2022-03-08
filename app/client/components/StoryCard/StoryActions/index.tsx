import { useState, memo, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { BiLike, BiDislike } from "react-icons/bi";
import { useSWRConfig } from "swr";

import { useUICtx, useProfile } from "../../Context";

import { gradeStory } from "../../../lib/createStory";

const Index = ({ storyId, like, dislike }: any) => {
  const { profile, mutateProfile } = useProfile();

  const initGrades = {
    like: profile?.likeStories?.includes(storyId) && like === 0 ? 1 : like,
    dislike:
      profile?.dislikeStories?.includes(storyId) && dislike === 0 ? 1 : dislike,
    isLiked: profile?.likeStories?.includes(storyId),
    isDisliked: profile?.dislikeStories?.includes(storyId),
  };
  const [grade, setGrade] = useState(initGrades);
  useEffect(() => {
    setGrade(initGrades);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);
  const loading = useDisclosure();
  const toast = useToast();
  const { login } = useUICtx();
  const handleGrade = async (isLike = true) => {
    if (!profile.user) {
      toast({
        duration: 2000,
        isClosable: true,
        render: customToast(login.onOpen),
      });
      return;
    }
    loading.onOpen();
    const data = await gradeStory(storyId, isLike);
    if (data) {
      const res = await mutateProfile();
      loading.onClose();
    } else loading.onClose();
  };

  return (
    <ButtonGroup spacing={3}>
      <Button
        onClick={() => handleGrade(true)}
        isDisabled={loading.isOpen}
        isActive={grade.isLiked}
        _active={{
          border: "1px solid blue",
          color: "blue",
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
        isActive={grade.isDisliked}
        _active={{
          border: "1px solid pink",
          color: "pink",
        }}
        leftIcon={<BiDislike />}
        size="xs"
        fontSize="10px"
        variant="solid"
        onClick={() => handleGrade(false)}
      >
        {grade.dislike}
      </Button>
      <Button
        onClick={() => {
          login.onOpen();
        }}
        leftIcon={<ChatIcon />}
        size="xs"
        fontSize="10px"
        variant="solid"
      >
        5
      </Button>
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
