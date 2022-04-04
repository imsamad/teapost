import { Avatar, HStack, IconButton, Text } from "@chakra-ui/react";
import { FcCollaboration } from "react-icons/fc";
import UserType from "@lib/types/UserType";
import MyLink from "@compo/MyLink";
import FollowAuthor from "@compo/FollowAuthor";

const Index = ({ author }: { author: UserType }) => {
  return (
    <HStack>
      <MyLink
        href={`/@/${author.username}`}
        _hover={{
          color: "blue.500",
        }}
      >
        <HStack>
          <Avatar size="xs" name={author.username} src={author?.profilePic} />
          <Text fontWeight={700} fontSize="md" ml={1}>
            {author.username}
          </Text>
        </HStack>
      </MyLink>
      <FollowAuthor author={author} />
      <IconButton aria-label="collab" icon={<FcCollaboration />} size="xs" />
      {/* <Text color="muted" fontSize="xs" ml={1}>
        + 3 more
      </Text> */}
    </HStack>
  );
};

export default Index;
