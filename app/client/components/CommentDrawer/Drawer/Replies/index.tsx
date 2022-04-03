import { Collapse, useDisclosure } from "@chakra-ui/react";
import TSButton from "@compo/UI/TSButton";

import CommentList from "../CommentList";

const Index = (props: { primaryId: string }) => {
  const showReplies = useDisclosure();

  return (
    <>
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
          outline: "1px",
        }}
        borderRadius="none"
        isFullWidth={false}
        onClick={showReplies.onToggle}
      >
        Replies
      </TSButton>
      <Collapse in={showReplies.isOpen} animateOpacity>
        <CommentList
          isReplyOpen={showReplies.isOpen}
          isPrimary={false}
          url={
            showReplies.isOpen ? `/comments/secondaries/${props.primaryId}` : ""
          }
        />
      </Collapse>
    </>
  );
};

export default Index;
