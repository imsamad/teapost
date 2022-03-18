import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Fade,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { commentActions, likeOrDislikeComment } from "@lib/api/commentApi";
import { PrimaryComment, SecondaryComment } from "@lib/types/CommentTypes";
import {
  BiDislike,
  BiDotsVerticalRounded,
  BiDownArrow,
  BiLike,
  BiReply,
  BiUpArrow,
} from "react-icons/bi";

import AddComment from "./CommentInput";
import { useAuthCtx } from "../Context";
import MyLink from "../MyLink";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type CommentType = {
  isPrimary: boolean;
  comment: Partial<PrimaryComment>;
  mutate: () => void;
};

const Index = ({ comment, isPrimary, mutate }: CommentType) => {
  const inputState = useDisclosure();
  const { openLoginToast, user } = useAuthCtx();
  const replyBadge = !isPrimary ? `@${comment?.user?.username}` : "";
  // @ts-ignore
  let hasBeenLiked: boolean = comment.meta?.likedBy?.includes(user?._id),
    // @ts-ignore
    hasBeenDisLiked: boolean = comment.meta?.dislikedBy?.includes(user?._id);

  const handleLikeOrDislike = (isLike: boolean) => {
    if (!user?._id) openLoginToast();
    else
      likeOrDislikeComment({
        isLike,
        isPrimary,
        undo: isLike ? hasBeenLiked : hasBeenDisLiked,
        // @ts-ignore
        commentId: comment._id,
      })
        .then((data) => {
          mutate();
        })
        .catch((err) => {
          console.log("err ", err);
        });
  };

  let secondaryComment: Partial<SecondaryComment> = {};
  if (!isPrimary) secondaryComment = comment;
  let secondaryUserReplyTo = secondaryComment.replyToSecondaryUser?.username
    ? `@${secondaryComment.replyToSecondaryUser?.username}  `
    : "";

  let showReply = useDisclosure();
  let actions = useDisclosure();

  const handleDelete = () => {
    if (!user?._id) openLoginToast();
    else
      commentActions({
        // @ts-ignore
        commentId: comment._id,
        isPrimary,
        type: "delete",
      })
        .then(() => mutate())
        .catch((err) => {});
  };

  const isEdit = useDisclosure();

  // @ts-ignore
  const isAuthor = user?._id.toString() == comment.user?._id.toString();

  return (
    <HStack
      borderBottom="1px"
      borderColor="gray.400"
      py="2"
      _last={{
        borderBottom: 0,
      }}
    >
      <MyLink href={`/@/${comment.user?.username}`} alignSelf="flex-start">
        <Avatar name={comment.user?.username} size="xs" />
      </MyLink>
      <Box my="20px" w="100%" mb="2">
        <HStack justifyContent="space-between">
          <MyLink href={`/@/${comment.user?.username}`}>
            <Text
              fontSize="xs"
              my="0"
              color="blue.800"
              fontWeight={700}
              textDecoration="underline"
            >
              {comment.user?.username}
            </Text>
          </MyLink>
        </HStack>

        {isEdit.isOpen ? (
          <AddComment
            mutate={mutate}
            comment={{
              // @ts-ignore
              commentId: comment._id,
              type: "edit",
              // @ts-ignore
              editValue: comment.text,
              isPrimary,
            }}
            onClose={() => {
              isEdit.onClose();
            }}
          />
        ) : (
          <Text fontSize="md" my="0" wordBreak="break-word" p="0">
            {secondaryUserReplyTo}
            {comment.text}
          </Text>
        )}
        <HStack>
          <ButtonGroup>
            <Button
              _hover={{
                cursor: "pointer",
              }}
              as="a"
              size="xs"
              leftIcon={<BiLike />}
              isActive={hasBeenLiked}
              onClick={() => handleLikeOrDislike(true)}
            >
              {comment.meta?.likedBy?.length || 0}
            </Button>
            <Button
              _hover={{
                cursor: "pointer",
              }}
              as="a"
              size="xs"
              leftIcon={<BiDislike />}
              isActive={hasBeenDisLiked}
              onClick={() => handleLikeOrDislike(false)}
            >
              {comment.meta?.dislikedBy?.length || 0}
            </Button>
            <Button
              _hover={{
                cursor: "pointer",
              }}
              as="a"
              size="xs"
              rightIcon={<BiReply />}
              onClick={() => inputState.onToggle()}
            >
              Reply
            </Button>
            {isAuthor && (
              <Box>
                <Box position="relative">
                  <IconButton
                    onClick={() => actions.onToggle()}
                    isRound
                    size="10px"
                    variant="outline"
                    icon={<BiDotsVerticalRounded />}
                    aria-label="Edit Or Delete"
                  />
                  <Fade in={actions.isOpen}>
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
                      onClick={() => {
                        actions.onClose();
                        isEdit.onOpen();
                      }}
                    >
                      <IconButton
                        size="xs"
                        variant="outline"
                        icon={<DeleteIcon />}
                        aria-label="Delete"
                        onClick={() => {
                          actions.onClose();
                          handleDelete();
                        }}
                      />
                      <IconButton
                        size="xs"
                        variant="outline"
                        icon={<EditIcon />}
                        aria-label="Edit"
                      />
                    </HStack>
                  </Fade>
                </Box>
              </Box>
            )}
          </ButtonGroup>
        </HStack>
        <Collapse in={inputState.isOpen}>
          <AddComment
            comment={{
              isPrimary,
              // @ts-ignore
              commentId: comment._id,
              type: "reply",
            }}
            mutate={mutate}
            replyBadge={replyBadge}
            onClose={() => inputState.onClose()}
          />
        </Collapse>
        {isPrimary && comment?.secondary?.length ? (
          <Button
            my="2"
            as="a"
            isFullWidth={false}
            size="xs"
            rightIcon={showReply.isOpen ? <BiUpArrow /> : <BiDownArrow />}
            onClick={() => showReply.onToggle()}
            _hover={{
              cursor: "pointer",
            }}
          >
            View {comment?.secondary?.length} replies
          </Button>
        ) : (
          ""
        )}
        <Collapse in={showReply.isOpen}>
          <Box borderLeft="1px" borderColor="gray.300" p="1">
            {/* @ts-igmore */}
            {isPrimary &&
              comment.secondary?.map((secondary: Partial<PrimaryComment>) => (
                <Index
                  key={secondary._id}
                  isPrimary={false}
                  comment={secondary}
                  mutate={mutate}
                />
              ))}
          </Box>
        </Collapse>
      </Box>
    </HStack>
  );
};

export default Index;
