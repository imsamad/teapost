import { ButtonGroup, Collapse, useDisclosure } from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';
import TSButton from '@compo/UI/TSButton';
import { likeOrDislikeCommentApi, replyCommentApi } from '@lib/api/commentApi';
import { memo, useState } from 'react';

import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';

import InputField from '../../InputField';
import { useCTX } from '../../AddedCtx';
const Index = ({
  commentId,
  isPrimary,
  username,
  ...rest
}: {
  noOfLikes: number;
  noOfDislikes: number;
  hasBeenLike: boolean;
  hasBeenDisLike: boolean;
  commentId: string;
  isPrimary: boolean;
  username: string;
}) => {
  const { auth, openLoginToast } = useAuthCtx();

  const [state, setState] = useState(rest);

  const handleLikeOrDislike = (isLike: boolean) => {
    if (!auth?.user?._id) {
      openLoginToast();
      return;
    }
    const isUndo = isLike ? state.hasBeenLike : state.hasBeenDisLike;
    likeOrDislikeCommentApi({
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
  const { setAddComments, setNoOfReplies, noOfReplies } = useCTX();
  const onSave = async (val: string) => {
    replyCommentApi({
      isPrimary,
      commentId,
      text: val,
    }).then(async (res) => {
      setAddComments(res.comment);
      setNoOfReplies(1);
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
            outline: 'none',
            border: 'none',
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
            outline: 'none',
            border: 'none',
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
            outline: 'none',
            border: 'none',
          }}
          onClick={() => {
            if (!auth?.user?._id) {
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
