import { Box, GridItem, useDisclosure } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import { addCommentApi } from '@lib/api/commentApi';
import { CombineComment } from '@lib/types/CommentTypes';
import { useState } from 'react';
import InputField from '../InputField';
import Comment from '../Comment';

import { useCTX } from '../AddedCtx';
const AddComment = ({ storyId }: { storyId: string }) => {
  const { addedComments, setAddComments, setNoOfReplies } = useCTX();

  const onSave = async (val: string) => {
    addCommentApi(storyId, val).then(({ comment }) => {
      setAddComments(comment);
      setNoOfReplies(1);
    });
  };

  return (
    <>
      <Box mb="12px">
        <InputField
          showAvatar={true}
          type="add"
          placeholer="Add Comment"
          onSave={onSave}
        />
      </Box>
      {/* {addedComments.map((comment) => {
        return <Comment key={comment._id} comment={comment} isPrimary={true} />;
      })} */}
    </>
  );
};

export default AddComment;
const Index2 = ({ isPrimary }: { isPrimary: boolean }) => {
  // @ts-ignore
  const [data, setData] = useState<CombineComment>([]);
  const onSave = async () => {};
  const action = useDisclosure();
  return (
    <>
      <Box>
        <TSButton
          //   border="1px"
          size="xs"
          variant="outline"
          colorScheme="blue"
          outline="none"
          border="none"
          _focus={{
            outline: 'none',
            border: 'none',
          }}
          onClick={() => action.onToggle()}
          isFullWidth={false}
        >
          Reply
        </TSButton>
      </Box>
      {action.isOpen && (
        <GridItem
          colSpan={2}
          //   position="absolute"
          //   top="100%"
          //   right="0"
          //   left="0"
          //   p="2px"
          p={2}
          borderRadius="md"
          //   border="1px"
          //   shadow="lg"
          //   zIndex={1000000000}
        >
          <InputField
            showAvatar={true}
            type="add"
            placeholer="reply"
            onSave={onSave}
            value="   "
            onCancel={action.onClose}
          />
        </GridItem>
      )}
    </>
  );
};
