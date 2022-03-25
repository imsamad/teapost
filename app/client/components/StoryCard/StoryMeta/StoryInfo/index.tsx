import { Badge, HStack, Text } from "@chakra-ui/react";
import { monthList } from "@lib/utils";

import MyLink from "../../../MyLink";

const StoryInfo = ({ tag, createdAt }: any) => {
  let date: any = new Date(createdAt);
  date = `${date.getDate()} ${monthList[date.getMonth()]}`;
  return (
    <HStack spacing={1} alignItems="center">
      <MySmText
        // @ts-ignore
        fontWeight={100}
      >
        |
      </MySmText>
      <MySmText>6 min</MySmText>
      <MySmText>~</MySmText>
      <MyLink href={`/q?tag=${tag?.title || "tech"}`}>
        <Badge
          textDecor="underline"
          variant="solid"
          colorScheme="gray"
          // bgColor="gray.400"
          fontStyle="italic"
          _dark={{
            color: "gray.900",
          }}
          textTransform="capitalize"
        >
          {tag?.title || "tech"}
        </Badge>
      </MyLink>
      <MySmText>~</MySmText>
      <MySmText>{date}</MySmText>
    </HStack>
  );
};

const MySmText = ({ children, ...rest }: { children: React.ReactNode }) => {
  return (
    <Text
      fontSize="xs"
      color="rgba(117,117,117)"
      //   lineHeight="20px"
      whiteSpace="nowrap"
      // fontStyle="italic"
      // fontSize={13}
      fontWeight={300}
      _dark={{
        color: "gray.300",
      }}
      {...rest}
    >
      {children}
    </Text>
  );
};
export default StoryInfo;
