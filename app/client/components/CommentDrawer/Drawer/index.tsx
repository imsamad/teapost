import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

import CommentList from './CommentList';
import AddComment from './AddComment';
import { useCTX, CtxProvider } from './AddedCtx';
import { useEffect } from 'react';

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
  const { noOfReplies, setNoOfReplies, addedComments } = useCTX();
  useEffect(() => {
    setNoOfReplies(noOfComments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <CtxProvider>
          <DrawerBody px="10px" pr="20px">
            {/* <AddComment storyId={storyId} /> */}

            <CommentList
              isPrimary={true}
              url={storyId ? `/comments/primaries/${storyId}` : ''}
              isInitial={true}
              pageNo={1}
            />
          </DrawerBody>
        </CtxProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
