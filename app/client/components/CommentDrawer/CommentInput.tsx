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

const AddComment = ({
  storyId,
  mutate,
  onClose,
  replyBadge,
  placeholder = "Reply...",
  comment,
}: InputProps) => {
  const [value, setValue] = useState<string>(comment?.editValue || "");
  const { auth, openLoginToast } = useAuthCtx();
  const handleReply = () => {
    if (!auth?.user?._id) {
      openLoginToast();
      return;
    }
    if (storyId) {
      commentOnStory({
        storyId,
        text: value,
      })
        .then(() => {
          setValue("");
          mutate();
        })
        .catch(() => {});
    } else if (comment) {
      commentActions({
        type: comment?.type,
        isPrimary: comment?.isPrimary,
        commentId: comment?.commentId,
        text: value,
      })
        .then(() => {
          setValue("");
          mutate();
        })
        .catch(() => {});
    }
  };
  return (
    <HStack w="full">
      <Avatar size="xs" name="Abdus Samad" alignSelf="flex-start" />
      <Stack flex="1">
        <HStack borderBottom="1px" borderColor="blue">
          {replyBadge && <Badge colorScheme="green">{replyBadge}</Badge>}
          <Input
            placeholder={placeholder}
            _placeholder={{
              fontWeight: 900,
            }}
            variant="unstyled"
            size="md"
            value={value}
            onChange={({ target: { value } }) => {
              value.split(" ").join("").length && setValue(value);
            }}
          />
        </HStack>
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
      </Stack>
    </HStack>
  );
};

export default AddComment;
