import { Badge, HStack, Text } from '@chakra-ui/react';
import { monthList } from '@lib/utils';

import MyLink from '@compo/MyLink';

const StoryMetaInfo = ({ tag, createdAt, readingTime }: any) => {
  // Convert 2012-02-02T01:58:28.998Z => Thu Feb 02 2012 07:28:28 GMT+0530 (India Standard Time)
  let date: any = new Date(createdAt);
  // Then more-readable => 2 Feb
  date = `${date.getDate()} ${monthList[date.getMonth()]}`;

  return (
    <HStack spacing={1} alignItems="center">
      <MySmText
        // @ts-ignore
        fontWeight={100}
      >
        |
      </MySmText>
      <MySmText>{readingTime} min</MySmText>
      <MySmText>~</MySmText>
      <MyLink href={`/tag/${tag || 'tech'}`}>
        <Badge
          // textDecor="underline"
          variant="solid"
          colorScheme="gray"
          // bgColor="gray.400"
          fontStyle="italic"
          fontWeight={400}
          textTransform="capitalize"
        >
          {tag || 'tech'}
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
        color: 'gray.300',
      }}
      {...rest}
    >
      {children}
    </Text>
  );
};
export default StoryMetaInfo;
