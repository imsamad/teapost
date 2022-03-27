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
