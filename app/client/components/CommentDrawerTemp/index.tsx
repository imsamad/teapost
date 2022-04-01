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
import data from "@lib/comment";
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
  const isValidating = false;
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
        <DrawerBody p="3" px="10px"></DrawerBody>
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
            // mutate={() => mutate()}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
