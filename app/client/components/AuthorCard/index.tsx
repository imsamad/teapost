import { Avatar, Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import FollowAuthor from '@compo/FollowAuthor';
import UserType from '@lib/types/UserType';
import Stats from './Stats';
import { cloudinaryUrl } from '@lib/utils';
import MyLink from '@compo/MyLink';

const Index = ({
  author,

  displayFull,
}: {
  author: UserType;

  displayFull: boolean;
}) => {
  const [numOfFollowers, setNumOfFollowers] = useState<number>(
    author?.followers || 0
  );
  const followCB = (hasBeenFollowing: boolean) =>
    setNumOfFollowers(
      hasBeenFollowing ? numOfFollowers - 1 : numOfFollowers + 1
    );

  return (
    <>
      <Flex my={2}>
        <MyLink href={`/@/${author.username}`}>
          <Avatar
            size="md"
            name={author.fullName}
            src={cloudinaryUrl({
              src: author?.profilePic,
              width: 100,
              height: 100,
            })}
          />
        </MyLink>
        <Box border="0px" pl="8">
          <HStack mb="2" border="0px">
            <MyLink href={`/@/${author.username}`}>
              <Stack justifyContent="center" pr="8px">
                <Text size="xl" fontWeight={700} lineHeight={1}>
                  {author.fullName}
                </Text>

                <Text
                  m="0"
                  p="0"
                  border="0px solid red"
                  lineHeight={1}
                  fontStyle="italic"
                >
                  @{author.username}
                </Text>
              </Stack>
            </MyLink>
            <FollowAuthor author={author} isFullBtn followCB={followCB} />
          </HStack>
          {displayFull && (
            <Text fontSize="md" fontWeight={300}>
              {author?.tagLines?.map(
                (tagLine, index) =>
                  index <= 2 && (
                    <React.Fragment key={tagLine}>
                      {`    ${tagLine}  ${index != 2 ? '|' : ''}`}
                    </React.Fragment>
                  )
              )}
            </Text>
          )}
        </Box>
      </Flex>
      {displayFull && (
        <Stats
          numOfStories={author.stories || 0}
          numOfFollowers={numOfFollowers}
        />
      )}
    </>
  );
};

export default Index;
