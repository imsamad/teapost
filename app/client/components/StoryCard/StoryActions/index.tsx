import { useState, useEffect } from "react";
import { ButtonGroup, useDisclosure } from "@chakra-ui/react";
import { BiLike, BiDislike } from "react-icons/bi";

import { useProfile, useAuthCtx } from "@compo/Context";
import { likeOrDislikeStory } from "@lib/api/storyApi";
import CommentsAndCollections from "./CommAndColl";
import TSButton from "@compo/UI/TSButton";

const Index = ({
  storyId,
  like,
  dislike,
}: {
  storyId: string;
  like: number;
  dislike: number;
}) => {
  const { profile, mutateProfile } = useProfile();
  const init = {
    like: profile?.likedStories?.includes(storyId) && like == 0 ? 1 : like,
    dislike:
      profile?.dislikedStories?.includes(storyId) && dislike == 0 ? 1 : dislike,
    hadBeenLiked: !!profile?.likedStories?.includes(storyId),
    hadBeenDisLiked: !!profile?.dislikedStories?.includes(storyId),
  };
  const [grade, setGrade] = useState(init);

  useEffect(
    () => setGrade(init),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile]
  );

  const loading = useDisclosure();
  const { openLoginToast } = useAuthCtx();
  const handleGrade = async (isLike = true) => {
    if (!profile?._id) {
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
      setGrade((pre: any) => ({
        ...pre,
        like: data.storyMeta.like,
        dislike: data.storyMeta.dislike,
      }));
      await mutateProfile();
      loading.onClose();
    } else loading.onClose();
  };

  return (
    <ButtonGroup spacing={3} alignItems="center">
      <TSButton
        onClick={() => handleGrade(true)}
        isDisabled={loading.isOpen}
        isActive={grade.hadBeenLiked}
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
      </TSButton>

      <TSButton
        isDisabled={loading.isOpen}
        isActive={grade.hadBeenDisLiked}
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
      </TSButton>
      <CommentsAndCollections storyId={storyId} />
    </ButtonGroup>
  );
};

export default Index;
