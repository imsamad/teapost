import { useDisclosure } from '@chakra-ui/react';
import { useAuthCtx, useProfile } from '@compo/Context';
import TSButton from '@compo/UI/TSButton';
import { likeOrDislikeStoryApi } from '@lib/api/storyApi';

import React, { useEffect, useState } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';

const LikeAndDislike = ({
  storyId,
  noOfLikes,
  noOfDislikes,
}: {
  storyId: string;
  noOfLikes: number;
  noOfDislikes: number;
}) => {
  const { myProfile, mutateProfile } = useProfile();

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
        hadBeenLiked: !!myProfile?.profile?.likedStories?.includes(storyId),
        hadBeenDisLiked:
          !!myProfile?.profile?.dislikedStories?.includes(storyId),
      }));

      // user liked or disliked but page is not staticlly-regenerated
      const isLikedButNotReGenerated =
        !!myProfile?.profile?.likedStories?.includes(storyId) &&
        grade.noOfLikes == 0;
      const isDisLikedButNotReGenerated =
        !!myProfile?.profile?.dislikedStories?.includes(storyId) &&
        grade.noOfDislikes == 0;
      isLikedButNotReGenerated && setGrade((pre) => ({ ...pre, like: 1 }));

      isDisLikedButNotReGenerated &&
        setGrade((pre) => ({ ...pre, dislike: 1 }));
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

    const data = await likeOrDislikeStoryApi({
      storyId,
      undo: isLike ? grade.hadBeenLiked : grade.hadBeenDisLiked,
      isLike,
    });

    if (data?.story) {
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
        leftIcon={grade.hadBeenLiked ? <AiFillLike /> : <AiOutlineLike />}
        size="xs"
        variant="outline"
        colorScheme="blue"
        outline="none"
        border="none"
        _focus={{
          outline: 'none',
          border: 'none',
        }}
        onClick={() => handleGrade(true)}
      >
        {grade.noOfLikes}
      </TSButton>
      <TSButton
        leftIcon={
          grade.hadBeenDisLiked ? <AiFillDislike /> : <AiOutlineDislike />
        }
        size="xs"
        variant="outline"
        colorScheme="blue"
        outline="none"
        border="none"
        _focus={{
          outline: 'none',
          border: 'none',
        }}
        onClick={() => handleGrade(false)}
      >
        {grade.noOfDislikes}
      </TSButton>
    </>
  );
};

export default LikeAndDislike;
/**
 

 <TSButton
          leftIcon={state.hasBeenLike ? <AiFillLike /> : <AiOutlineLike />}
          size="xs"
          variant="outline"
          colorScheme="blue"
          outline="none"
          border="none"
          _focus={{
            outline: "none",
            border: "none",
          }}
          onClick={() => handleLikeOrDislike(true)}
        >
          {state.noOfLikes}
        </TSButton>
        <TSButton
          leftIcon={
            state.hasBeenDisLike ? <AiFillDislike /> : <AiOutlineDislike />
          }
          size="xs"
          variant="outline"
          colorScheme="blue"
          outline="none"
          border="none"
          _focus={{
            outline: "none",
            border: "none",
          }}
          onClick={() => handleLikeOrDislike(false)}
        >
          {state.noOfDislikes}
        </TSButton>





















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
 */
