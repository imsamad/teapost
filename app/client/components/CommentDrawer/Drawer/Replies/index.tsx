import { Collapse, useDisclosure } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';

import CommentList from '../CommentList';
import { useCTX } from '../AddedCtx';
import { useEffect, useState } from 'react';
const Index = (props: { primaryId: string; noOfReplies: number }) => {
  const showReplies = useDisclosure();

  const { setNoOfReplies, noOfReplies, setAddComments } = useCTX();

  useEffect(() => {
    if (!noOfReplies) setNoOfReplies(props.noOfReplies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {noOfReplies ? (
        <TSButton
          // border="1px"
          justifySelf="flex-start"
          alignSelf="flex-start"
          size="xs"
          variant="outline"
          colorScheme="blue"
          outline="none"
          border="0px"
          _focus={{
            outline: '1px',
          }}
          borderRadius="none"
          isFullWidth={false}
          onClick={() => {
            showReplies.onToggle();
            // @ts-ignore
            setAddComments([], true);
          }}
        >
          {noOfReplies} Replies
        </TSButton>
      ) : (
        ''
      )}
      <Collapse in={showReplies.isOpen} animateOpacity>
        <CommentList
          isPrimary={false}
          url={
            showReplies.isOpen ? `/comments/secondaries/${props.primaryId}` : ''
          }
          isInitial={true}
          pageNo={1}
        />
      </Collapse>
    </>
  );
};

export default Index;
