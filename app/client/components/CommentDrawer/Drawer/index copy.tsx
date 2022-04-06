import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";

import CommentList from "./CommentList";
import AddComment from "./AddComment";
import { useCTX } from "./AddedCtx";
import { useEffect } from "react";
const Index = ({
  isOpen,
  onClose,
  storyId,
  noOfComments,
}: {
  isOpen: boolean;
  onClose: () => void;
  storyId: string;
  noOfComments: number;
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      placement="right"
      size="lg"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Comments</DrawerHeader>
        <DrawerBody px="10px" pr="20px">
          <AddComment storyId={storyId} />
          {noOfComments > 0 ? (
            <CommentList
              isPrimary={true}
              url={storyId ? `/comments/primaries/${storyId}` : ""}
              isInitial={true}
              pageNo={1}
            />
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
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
