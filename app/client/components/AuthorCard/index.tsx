import { Avatar, Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";

import React, { useState } from "react";

import FollowAuthor from "@compo/FollowAuthor";

import UserType from "@lib/types/UserType";
import Stats from "./Stats";

const Index = ({
  author,
  numOfStories,
  displayStats,
}: {
  author: UserType;
  numOfStories?: number;
  displayStats: boolean;
}) => {
  const [numOfFollowers, setNumOfFollowers] = useState<number>(
    // @ts-ignore
    author?.profile?.followers?.length || 0
  );
  const followCB = (hasBeenFollowing: boolean) =>
    setNumOfFollowers(
      hasBeenFollowing ? numOfFollowers - 1 : numOfFollowers + 1
    );
  return (
    <>
      <Flex>
        <Avatar
          size="xl"
          name={author?.profile.fullName}
          src={author?.profile.profilePic}
        />
        <Box border="0px" pl="8">
          <HStack mb="2" border="0px">
            <Stack justifyContent="center" pr="8px">
              <Text size="xl" fontWeight={700} lineHeight={1}>
                {author?.profile.fullName}
              </Text>

              <Text
                m="0"
                p="0"
                border="0px solid red"
                lineHeight={1}
                fontStyle="italic"
              >
                @{author?.username}
              </Text>
            </Stack>
            <FollowAuthor author={author} isFullBtn followCB={followCB} />
          </HStack>
          <Text fontSize="md" fontWeight={300}>
            {author?.profile.tagLines.map((tagLine, index) => (
              <React.Fragment key={tagLine}>
                {`    ${tagLine}  ${
                  author?.profile?.tagLines?.length - 1 > index ? "|" : ""
                }`}
              </React.Fragment>
            ))}
          </Text>
        </Box>
      </Flex>
      {displayStats && numOfStories && (
        <Stats
          numOfStories={numOfStories || 0}
          numOfFollowers={numOfFollowers}
        />
      )}
    </>
  );
};

export default Index;
