import { useDisclosure } from "@chakra-ui/react";
import { useAuthCtx, useProfile } from "@compo/Context";
import TSButton from "@compo/UI/TSButton";
import { likeOrDislikeStory } from "@lib/api/storyApi";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";

const LikeAndDislike = ({
  storyId,
  noOfLikes,
  noOfDislikes,
}: {
  storyId: string;
  noOfLikes: number;
  noOfDislikes: number;
}) => {
  const isOnHomePage = ["/", "/home", "/@/[author]", "/tag/[tag]"].includes(
    Router.pathname
  );

  const { myProfile, mutateProfile } = useProfile();
  console.log("Router.pathname ", Router.pathname);
  const [grade, setGrade] = useState({
    noOfLikes,
    noOfDislikes,
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

      if (
        !!myProfile?.likedStories?.includes(storyId) &&
        grade.noOfLikes == 0
      ) {
        setGrade((pre) => ({ ...pre, like: 1 }));
      }
      if (
        !!myProfile?.dislikedStories?.includes(storyId) &&
        grade.noOfDislikes == 0
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
      await mutateProfile();
      setGrade({
        noOfLikes: data.story.noOfLikes,
        noOfDislikes: data.story.noOfDislikes,
        hadBeenDisLiked:
          data.story.noOfLikes < data.story.noOfDislikes ? true : false,
        hadBeenLiked:
          data.story.noOfLikes > data.story.noOfDislikes ? true : false,
      });
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
        size={isOnHomePage ? "xs" : "sm"}
        variant={!isOnHomePage ? "outline" : "solid"}
        colorScheme={!isOnHomePage ? "purple" : "gray"}
      >
        {grade.noOfLikes}
      </TSButton>

      <TSButton
        isDisabled={loading.isOpen}
        isActive={grade.hadBeenDisLiked}
        _active={{
          border: "1px solid pink",
          color: "pink",
        }}
        leftIcon={<BiDislike />}
        size={isOnHomePage ? "xs" : "sm"}
        variant={!isOnHomePage ? "outline" : "solid"}
        colorScheme={!isOnHomePage ? "purple" : "gray"}
        onClick={() => handleGrade(false)}
      >
        {grade.noOfDislikes}
      </TSButton>
    </>
  );
};

export default LikeAndDislike;
