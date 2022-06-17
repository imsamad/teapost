import { Collapse, GridItem, useDisclosure } from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';

import TSButton from '@compo/UI/TSButton';
import { replyCommentApi } from '@lib/api/commentApi';
import { CombineComment } from '@lib/types/CommentTypes';

import { FaReply } from 'react-icons/fa';
import CommentForm from '../CommentForm';

const ReplyComment = ({
  onReplyCB,
  isPrimary,
  commentId,
}: {
  onReplyCB: (comment: CombineComment) => Promise<void>;
  isPrimary: boolean;
  commentId: string;
}) => {
  const reply = useDisclosure();

  const onSave = async (val: string) => {
    replyCommentApi({
      isPrimary,
      commentId,
      text: val,
    }).then((res) => {
      onReplyCB(res.comment).then(() => {
        reply.onClose();
      });
    });
  };

  const { auth, openLoginToast } = useAuthCtx();

  return (
    <>
      <GridItem>
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
      </GridItem>
      <GridItem colSpan={4}>
        <Collapse in={reply.isOpen}>
          <CommentForm
            showAvatar={true}
            type="add"
            placeholer={`@${'username'}`}
            onSubmitCB={onSave}
            onCancel={reply.onClose}
          />
        </Collapse>
      </GridItem>
    </>
  );
};

export default ReplyComment;
