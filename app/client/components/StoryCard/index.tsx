import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';

import { useTheme } from '@emotion/react';

import AuthorBadge from '../AuthorBadge';
import NewsCardActions from '../StoryCardActions';
const Index = () => {
  const theme = useTheme();

  const { sm } = theme.breakpoints;

  const [isLargerThanSM] = useMediaQuery(`(min-width: ${sm})`);

  return (
    <Box m={4} borderBottom="1px">
      <Flex alignItems="center">
        <Box pr="2">
          <AuthorBadge
            image="https://bit.ly/tioluwani-kolawole"
            full_name="Kola Tioluwani"
            short_name="imsamad"
          />
          <Heading noOfLines={2} fontSize={['14px', 16, '22px']} my="2">
            The 6 Rules of Email: How to Eliminate Email Anxiety and Take
            Control of Your Inbox Today (Backed by Science)
          </Heading>
          {isLargerThanSM && (
            <Text
              fontSize="20px"
              fontWeight={500}
              color="#757575"
              noOfLines={1}
            >
              6 scientific ways to eliminate the daily stress caused by emails.
            </Text>
          )}
          <Flex alignItems="center">
            <Badge mr="2" display={['none', 'block']}>
              Programming
            </Badge>
            <Text fontSize={['10px', '13px']} color="#757575">
              Oct 8,2018
            </Text>
            <Text mx="2">{'~'}</Text>
            <Text fontSize={['10px', '13px']} color="#757575">
              11min read
            </Text>
          </Flex>
          <Box display={['none', 'none', 'block']}>
            <NewsCardActions />
          </Box>
        </Box>
        <Box
          flexShrink={1}
          maxW={[100, 150, 250]}
          maxH={[100, 120, 230]}
          minW="75"
          minH="75"
          overflow="hidden"
        >
          <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
        </Box>
      </Flex>
      <Box display={['block', 'block', 'none']}>
        <NewsCardActions />
      </Box>
    </Box>
  );
};

export default Index;
