import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { BiCommentAdd } from 'react-icons/bi';

import { useCallback, useState } from 'react';
import NewComments from './NewComments';
import Primaries from './Primaries';

export default function CommentDrawer({
  storyId,
  noOfComments: noCommentsProp,
}: {
  storyId: string;
  noOfComments: number;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [noOfComments, setNoOfCommentsProp] = useState(noCommentsProp);

  const incremetComment = useCallback(
    () => setNoOfCommentsProp((pre) => pre + 1),
    []
  );

  const decrementComment = useCallback(
    () => setNoOfCommentsProp((pre) => pre - 1),
    []
  );

  return (
    <>
      <Button
        variant="ghost"
        colorScheme="blue"
        leftIcon={<BiCommentAdd />}
        size="xs"
        _focus={{ outline: 'none' }}
        onClick={onOpen}
      >
        {noOfComments}
      </Button>

      {isOpen && !!storyId && (
        <Drawer onClose={onClose} isOpen={isOpen && !!storyId} size="sm">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Comments {noOfComments}</DrawerHeader>

            <DrawerBody px="10px" pr="20px">
              <NewComments
                storyId={storyId}
                incremetComment={incremetComment}
                decrementComment={decrementComment}
              />
              {noCommentsProp != 0 && (
                <Primaries
                  storyId={storyId}
                  incremetComment={incremetComment}
                  decrementComment={decrementComment}
                />
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
