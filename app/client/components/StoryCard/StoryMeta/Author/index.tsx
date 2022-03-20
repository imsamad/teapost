import { Avatar, HStack, Text } from "@chakra-ui/react";

import UserType from "@lib/types/UserType";
import MyLink from "@compo/MyLink";
import Follow from "./Follow";

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
          <Avatar size="2xs" name={author.username} src={author?.profilePic} />
          <Text fontWeight={600} fontSize="sm" ml={1}>
            {author.username}
          </Text>
        </HStack>
      </MyLink>
      <Follow author={author} />
    </HStack>
  );
};

export default Index;
