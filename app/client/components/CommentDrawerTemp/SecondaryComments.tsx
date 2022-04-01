import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import TSButton from "@compo/UI/TSButton";
import { CommentForDisplay } from "@lib/types/CommentTypes";
import React from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import Comment from "./Comment";

const SecondaryComments = ({
  secondaries,
  mutate,
}: {
  secondaries: Omit<CommentForDisplay, "secondary">[];
  mutate: () => void;
}) => {
  const showReply = useDisclosure();
  return (
    <>
      <TSButton
        my="2"
        size="xs"
        rightIcon={showReply.isOpen ? <BiUpArrow /> : <BiDownArrow />}
        onClick={() => showReply.onToggle()}
        _hover={{
          cursor: "pointer",
        }}
      >
        View {secondaries?.length} replies
      </TSButton>

      <Collapse in={showReply.isOpen}>
        <Box borderLeft="1px" borderColor="gray.300" p="1">
          {secondaries?.map((secondary: any) => (
            <Comment
              key={secondary._id}
              isPrimary={false}
              comment={secondary}
              mutate={mutate}
            />
          ))}
        </Box>
      </Collapse>
    </>
  );
};

export default SecondaryComments;
