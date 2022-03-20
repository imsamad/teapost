import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import { PrimaryComment } from "@lib/types/CommentTypes";
import useSWR from "swr";

import CommentInput from "./CommentInput";
import CommentSkeleton from "./CommentSkeleton";
import Comment from "./Comment";

const Index = ({
  isOpen,
  onClose,
  storySelected,
}: {
  isOpen: boolean;
  storySelected: string;
  onClose: () => void;
}) => {
  const { data, isValidating, mutate } = useSWR<{ comments: PrimaryComment[] }>(
    () => storySelected && `/comments/story/${storySelected}`
  );

  return (
    <Drawer
      isOpen={isOpen && Boolean(storySelected)}
      onClose={onClose}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Comments</DrawerHeader>
        <DrawerBody p="3" px="10px">
          {isValidating && !data?.comments ? (
            <CommentSkeleton />
          ) : data?.comments && data?.comments?.length > 0 ? (
            data.comments.map((comment) => (
              <Comment
                mutate={() => mutate()}
                key={comment._id}
                comment={comment}
                isPrimary={true}
              />
            ))
          ) : (
            <Heading
              textAlign="justify"
              size="md"
              fontStyle="italic"
              color="green.600"
            >
              No comments, be first one to comment
            </Heading>
          )}
        </DrawerBody>
        <DrawerFooter
          borderTop="2px"
          borderColor="blue.500"
          borderStyle="dashed"
          px="4"
          py="2"
          justifyContent="flex-start"
        >
          <CommentInput
            placeholder="Add Comment..."
            storyId={storySelected}
            mutate={() => mutate()}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
