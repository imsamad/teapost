import { Avatar, HStack, IconButton, Text } from "@chakra-ui/react";
import { BiBellPlus, BiBellMinus } from "react-icons/bi";
import MyLink from "../../../MyLink";
import { useRouter } from "next/router";
type propTypes = {
  username: string;
  email: string;
  id: string;
};

const Index = ({ author }: any) => {
  const router = useRouter();
  return (
    <HStack>
      <MyLink
        href={`/@/${author.username}`}
        _hover={{
          color: "blue.500",
        }}
      >
        <HStack>
          <Avatar size="2xs" name={author.username} src={author.profilePic} />

          <Text fontWeight={600} fontSize="sm" ml={1}>
            {author.username}
          </Text>
        </HStack>
      </MyLink>
      <IconButton
        _active={{
          outline: "none",
        }}
        _focus={{
          border: "1px solid gray",
          bgColor: "transparent",
          boxShadow: "none",
          WebkitTapHighlightColor: "transparent",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          MozBackfaceVisibility: "hidden",
        }}
        icon={<BiBellPlus fontSize="19px" />}
        size="xs"
        isRound
        aria-label={`follow ${author.username}`}
      />
    </HStack>
  );
};

export default Index;
