import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from "@chakra-ui/react";
import InputField from "./InputField";
import CommentList from "./CommentList";
import AddComment from "./AddComment";

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
        {/* <DrawerFooter
          borderTop="1px"
          borderColor="blue.500"
          // borderStyle="dashed"
          px="2"
          py="2"
          justifyContent="flex-start"
        >
          <InputField
            showAvatar={true}
            type="add"
            placeholer="Comment"
            onSave={async (str: string) => {}}
          />
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
