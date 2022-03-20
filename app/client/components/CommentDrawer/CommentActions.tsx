import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Collapse,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuthCtx } from "@compo/Context";
import TSButton from "@compo/UI/TSButton";
import TSIconButton from "@compo/UI/TSIconButton";
import { commentActions, likeOrDislikeComment } from "@lib/api/commentApi";
import { CommentForDisplay } from "@lib/types/CommentTypes";
import React from "react";
import {
  BiDislike,
  BiDotsVerticalRounded,
  BiLike,
  BiReply,
} from "react-icons/bi";
import AddComment from "./CommentInput";

const CommentActions = ({
  comment,
  isPrimary,
  mutate,
  isEditOnOpen,
}: {
  comment: CommentForDisplay;
  isPrimary: boolean;
  mutate: () => void;
  isEditOnOpen: () => void;
}) => {
  const { openLoginToast, user } = useAuthCtx();

  let actions = useDisclosure();

  let hasBeenLiked = !!comment.meta?.likedBy?.includes(user?._id || ""),
    hasBeenDisLiked = !!comment.meta?.dislikedBy?.includes(user?._id || "");
  const inputState = useDisclosure();
  const handleLikeOrDislike = (isLike: boolean) => {
    if (!user?._id) openLoginToast();
    else
      likeOrDislikeComment({
        isLike,
        isPrimary,
        undo: isLike ? hasBeenLiked : hasBeenDisLiked,

        commentId: comment._id,
      })
        .then((data) => {
          mutate();
        })
        .catch((err) => {
          console.log("err ", err);
        });
  };
  const isAuthor = user?._id?.toString() == comment.user?._id.toString();

  const handleDelete = () => {
    if (!user?._id) openLoginToast();
    else
      commentActions({
        commentId: comment._id,
        isPrimary,
        type: "delete",
      })
        .then(() => mutate())
        .catch((err) => {});
  };

  const replyBadge = !isPrimary ? `@${comment?.user?.username}` : "";
  return (
    <>
      <HStack>
        <ButtonGroup>
          <TSButton
            _hover={{
              cursor: "pointer",
            }}
            size="xs"
            leftIcon={<BiLike />}
            isActive={hasBeenLiked}
            onClick={() => handleLikeOrDislike(true)}
          >
            {comment.meta?.likedBy?.length || 0}
          </TSButton>
          <TSButton
            _hover={{
              cursor: "pointer",
            }}
            size="xs"
            leftIcon={<BiDislike />}
            isActive={hasBeenDisLiked}
            onClick={() => handleLikeOrDislike(false)}
          >
            {comment.meta?.dislikedBy?.length || 0}
          </TSButton>
          <TSButton
            _hover={{
              cursor: "pointer",
            }}
            as="a"
            size="xs"
            rightIcon={<BiReply />}
            onClick={() => inputState.onToggle()}
          >
            Reply
          </TSButton>
          {isAuthor && (
            <Box>
              <Box position="relative">
                <TSIconButton
                  onClick={() => actions.onToggle()}
                  isRound
                  size="10px"
                  variant="outline"
                  icon={<BiDotsVerticalRounded />}
                  aria-label="Edit Or Delete"
                />
                <Collapse in={actions.isOpen}>
                  <HStack
                    zIndex="tooltip"
                    bgColor="white"
                    position="absolute"
                    right="0"
                    borderColor="gray.200"
                    border="1px"
                    shadow="md"
                    borderRadius="md"
                    p="1"
                    // onClick={(e) => {
                    //   actions.onClose();
                    //   isEdit.onOpen();
                    //   e.preventDefault();
                    // }}
                  >
                    <TSIconButton
                      size="xs"
                      variant="outline"
                      icon={<DeleteIcon />}
                      aria-label="Delete"
                      mx="2"
                      onClick={(e) => {
                        actions.onClose();
                        handleDelete();
                        e.preventDefault();
                      }}
                    />
                    <TSIconButton
                      size="xs"
                      variant="outline"
                      icon={<EditIcon />}
                      aria-label="Edit"
                      onClick={() => {
                        actions.onClose();
                        isEditOnOpen();
                      }}
                    />
                  </HStack>
                </Collapse>
              </Box>
            </Box>
          )}
        </ButtonGroup>
      </HStack>

      <Collapse in={inputState.isOpen}>
        <AddComment
          comment={{
            isPrimary,
            commentId: comment._id,
            type: "reply",
          }}
          mutate={mutate}
          replyBadge={replyBadge}
          onClose={() => inputState.onClose()}
        />
      </Collapse>
    </>
  );
};

export default CommentActions;
