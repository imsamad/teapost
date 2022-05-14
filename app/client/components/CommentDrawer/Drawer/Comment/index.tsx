import {
  Avatar,
  ButtonGroup,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import { deleteCommentApi, updateCommentApi } from '@lib/api/commentApi';

import { getCookies } from '@lib/cookies';
import { CombineComment } from '@lib/types/CommentTypes';
import { memo, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

import EditDelete from './EditDelete';
import InputField from '../InputField';
import Meta from './Meta';
import LikeDislikeReply from './LikeDislikeReply';
import CommentText from './CommentText';

import Replies from '../Replies';

const Index = ({
  comment: commentUpper,
  isPrimary,
}: {
  comment: CombineComment;
  isPrimary: boolean;
}) => {
  const [comment, setComment] = useState(commentUpper);
  const editComment = useDisclosure();
  if (!comment) return <></>;
  const userId = getCookies()?.user?._id;
  const isAuthor = userId == comment?.user?._id;

  const onDelete = async () => {
    deleteCommentApi({
      isPrimary,
      commentId: comment._id,
    }).then(() => {
      // @ts-ignore
      setComment(null);
    });
  };

  const onSave = async (val: string) => {
    if (val != comment.text) {
      updateCommentApi({
        isPrimary,
        commentId: comment._id,
        text: val,
      }).then((res) => {
        setComment((pre) => ({
          ...pre,
          text: res.comment.text,
          createdAt: res.comment.createdAt,
          updatedAt: res.comment.updatedAt,
        }));
        editComment.onClose();
      });
    }
  };

  return (
    <>
      {comment && (
        <HStack borderBottom="0px" mb="4px">
          <Avatar
            alignSelf="flex-start"
            name={comment.user.fullName}
            src={comment.user.profilePic}
            size="sm"
          />
          <Stack alignSelf="flex-start" flex="1">
            <HStack border="0px">
              <Meta
                username={comment.user.username}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
              />

              {isAuthor && (
                <EditDelete openEdit={editComment.onOpen} onDelete={onDelete} />
              )}
            </HStack>
            {editComment.isOpen ? (
              <InputField
                onSave={onSave}
                type="edit"
                value={comment.text}
                onCancel={() => {
                  editComment.onClose();
                }}
              />
            ) : (
              <CommentText
                text={comment.text}
                replyTo={
                  comment?.secondaryUser
                    ? '@' + comment.secondaryUser.username
                    : ''
                }
              />
            )}
            <LikeDislikeReply
              username={comment.user.username}
              noOfDislikes={comment.noOfDislikes}
              noOfLikes={comment.noOfLikes}
              hasBeenLike={
                comment.noOfLikes
                  ? !!comment.meta?.likedBy.includes(userId)
                  : false
              }
              hasBeenDisLike={
                comment.noOfDislikes
                  ? !!comment.meta?.dislikedBy.includes(userId)
                  : false
              }
              commentId={comment._id}
              isPrimary={isPrimary}
            />
            {isPrimary && (
              <Replies
                primaryId={comment._id}
                noOfReplies={comment.noOfReplies || 0}
              />
            )}
          </Stack>
        </HStack>
      )}
    </>
  );
};

export default memo(Index);
/*


          <TSButton
            size="xs"
            variant="outline"
            colorScheme="blue"
            outline="none"
            border="none"
            _focus={{
              outline: "none",
              border: "none",
            }}
          >
            Reply
          </TSButton>







                  {isPrimary && comment.noOfReplies && (
          <TSButton
            justifySelf="flex-start"
            alignSelf="flex-start"
            size="xs"
            variant="outline"
            colorScheme="blue"
            outline="none"
            border="0"
            _focus={{
              outline: "1px",
            }}
            borderRadius="none"
            isFullWidth={false}
          >
            4 Replies
          </TSButton>
        )}
*/
