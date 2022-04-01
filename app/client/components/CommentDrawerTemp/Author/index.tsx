import { Avatar as ChkaraAvatar, Text } from "@chakra-ui/react";
import { CommentForDisplay } from "@lib/types/CommentTypes";
import UserType from "@lib/types/UserType";

import MyLink from "../../MyLink";
import AddComment from "../CommentInput";
export const Avatar = ({ user }: { user: UserType }) => {
  return (
    <MyLink href={`/@/${user?.username}`} alignSelf="flex-start">
      <ChkaraAvatar
        name={user?.username}
        size="xs"
        src={user?.profile?.profilePic}
      />
    </MyLink>
  );
};

export const AuthorAndComment = ({
  comment,
  mutate,
  isEditOpen,
  onClose,
  isPrimary,
}: {
  comment: CommentForDisplay;
  mutate: () => void;
  isEditOpen: boolean;
  onClose: () => void;
  isPrimary: boolean;
}) => {
  const secondaryUserReplyTo = comment?.replyToSecondaryUser?.username
    ? `@${comment.replyToSecondaryUser?.username}  `
    : "";
  return (
    <>
      <MyLink href={`/@/${comment.user?.username}`}>
        <Text
          fontSize="xs"
          my="0"
          color="blue.800"
          fontWeight={700}
          textDecoration="underline"
        >
          {comment.user?.username}
        </Text>
      </MyLink>
      {isEditOpen ? (
        <AddComment
          mutate={mutate}
          comment={{
            commentId: comment._id,
            type: "edit",
            editValue: comment.text,
            isPrimary,
          }}
          onClose={() => {
            onClose();
          }}
        />
      ) : (
        <Text fontSize="md" my="0" wordBreak="break-word" p="0">
          <MyLink href={`/@/${secondaryUserReplyTo.substring(1)}`}>
            <Text color="blue.400" as="span">
              {secondaryUserReplyTo}
            </Text>
          </MyLink>
          {comment.text}
        </Text>
      )}
    </>
  );
};
