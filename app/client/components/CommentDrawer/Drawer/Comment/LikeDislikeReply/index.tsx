import {
  Box,
  ButtonGroup,
  Collapse,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useAuthCtx } from "@compo/Context";
import TSButton from "@compo/UI/TSButton";
import { likeOrDislikeComment, replyComment } from "@lib/api/commentApi";
import { memo, useState } from "react";

import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import { useSWRConfig } from "swr";

import InputField from "../../InputField";

const Index = ({
  commentId,
  isPrimary,
  mutate,
  username,
  ...rest
}: {
  noOfLikes: number;
  noOfDislikes: number;
  hasBeenLike: boolean;
  hasBeenDisLike: boolean;
  commentId: string;
  isPrimary: boolean;
  mutate?: () => void;
  username: string;
}) => {
  const { auth, openLoginToast } = useAuthCtx();

  const [state, setState] = useState(rest);

  const handleLikeOrDislike = (isLike: boolean) => {
    if (!auth.user?._id) {
      openLoginToast();
      return;
    }
    const isUndo = isLike ? state.hasBeenLike : state.hasBeenDisLike;
    likeOrDislikeComment({
      isPrimary,
      isLike,
      commentId,
      undo: isUndo,
    }).then((res) => {
      setState({
        noOfLikes: res.comment.noOfLikes,
        noOfDislikes: res.comment.noOfDislikes,
        hasBeenLike: res.comment.noOfLikes > state.noOfLikes ? true : false,
        hasBeenDisLike:
          res.comment.noOfDislikes > state.noOfDislikes ? true : false,
      });
    });
  };
  const reply = useDisclosure();
  // const { mutate: mutateSWR } = useSWRConfig();
  const onSave = async (val: string) => {
    replyComment({
      isReplyToPrimary: isPrimary,
      commentId,
      text: val,
    }).then(async (res) => {
      // const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/comments/secondaries/${commentId}`;
      // mutateSWR([endpoint]);
      mutate && mutate();
      reply.onClose();
    });
  };
  return (
    <>
      <ButtonGroup>
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
          leftIcon={<FaReply />}
          size="xs"
          variant="outline"
          colorScheme="blue"
          outline="none"
          border="none"
          _focus={{
            outline: "none",
            border: "none",
          }}
          onClick={() => {
            if (!auth.user?._id) {
              openLoginToast();
              return;
            }
            reply.onToggle();
          }}
        >
          Reply
        </TSButton>
      </ButtonGroup>
      <Collapse in={reply.isOpen}>
        <InputField
          showAvatar={true}
          type="add"
          placeholer={`@${username}`}
          onSave={onSave}
          // value={reply.isOpen ? "   " : "   "}
          onCancel={reply.onClose}
        />
      </Collapse>
    </>
  );
};

export default memo(Index);
