import {
  Avatar,
  Badge,
  Button,
  Collapse,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useAuthCtx } from "@compo/Context";
import { commentActions } from "@lib/api/commentApi";
import { commentOnStory } from "@lib/api/storyApi";
import { useState } from "react";

interface Props {
  onClose?: () => void;
  replyBadge?: string;
  placeholder?: string;
  mutate: () => void;
}
interface InputProps
  extends Props,
    Partial<{
      storyId: string;
      comment: {
        isPrimary: boolean;
        type: "edit" | "delete" | "reply";
        commentId: string;
        editValue?: string;
      };
    }> {}

const AddComment = () => {
  return (
    <HStack w="full">
      <Avatar size="xs" name="Abdus Samad" alignSelf="flex-start" />
      <Stack flex="1">
        <HStack borderBottom="1px" borderColor="blue">
          <Badge colorScheme="green">{replyBadge}</Badge>
          <Input
            placeholder={placeholder}
            _placeholder={{
              fontWeight: 900,
            }}
            variant="unstyled"
            size="md"
            onChange={({ target: { value } }) => {
              value.split(" ").join("").length && setValue(value);
            }}
          />
        </HStack>
        {/* {value && ( */}
        <Collapse in={Boolean(value) || Boolean(replyBadge)}>
          <HStack justifyContent="flex-end">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setValue("");
                onClose && onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              size="xs"
              onClick={() => {
                handleReply();
                onClose && onClose();
              }}
            >
              {comment?.editValue ? "Edit" : "Save"}
            </Button>
          </HStack>
        </Collapse>
        {/* )} */}
      </Stack>
    </HStack>
  );
};

export default AddComment;
