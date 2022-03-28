import { Box, HStack, useDisclosure } from "@chakra-ui/react";
import { CommentForDisplay } from "@lib/types/CommentTypes";

type CommentType = {
  isPrimary: boolean;
  comment: CommentForDisplay;
  mutate: () => void;
};

import { AuthorAndComment, Avatar } from "./Author";
import CommentActions from "./CommentActions";
import SecondaryComments from "./SecondaryComments";

const Index = ({ comment, isPrimary, mutate }: CommentType) => {
  const isEdit = useDisclosure();

  return (
    <HStack
      borderBottom="1px"
      borderColor="gray.400"
      py="2"
      _last={{
        borderBottom: 0,
      }}
    >
      <Avatar user={comment.user} />
      <Box my="20px" w="100%" mb="2">
        <AuthorAndComment
          comment={comment}
          isEditOpen={isEdit.isOpen}
          mutate={mutate}
          isPrimary={isPrimary}
          onClose={isEdit.onClose}
        />
        <CommentActions
          comment={comment}
          isEditOnOpen={isEdit.onOpen}
          mutate={mutate}
          isPrimary={isPrimary}
        />

        {isPrimary && comment?.secondary?.length > 0 && (
          <SecondaryComments mutate={mutate} secondaries={comment.secondary} />
        )}
      </Box>
    </HStack>
  );
};

export default Index;
