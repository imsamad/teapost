import {
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react';

import NewsCardActions from '../StoryCardActions';
import Author from '../AuthorBadge';
const Index = () => {
  return (
    <Flex p={4} alignItems="center" mx="auto">
      <Box p={{ base: 2, md: 4 }}>
        <Author
          image="https://bit.ly/tioluwani-kolawole"
          full_name="Kola Tioluwani"
          short_name="imsamad"
        />
        <Heading
          fontSize={{ base: 'sm', sm: 'md' }}
          lineHeight="tall"
          noOfLines={2}
        >
          Finding customers for your new business
        </Heading>
        <Badge variant="solid" display={['none', 'inline-block']}>
          Marketing
        </Badge>
        <Text
          mt={2}
          color="gray.500"
          noOfLines={2}
          display={['none', 'block', 'block']}
        >
          Getting a new business off the ground is a lot of hard work. Here are
          five ideas you can use to find your first customers.
        </Text>
        <NewsCardActions />
      </Box>
      <Box maxW={[100, 150, 250]} maxH={[100, 120, 230]}>
        <Image
          borderRadius="lg"
          src="https://bit.ly/2jYM25F"
          alt="Woman paying for a purchase"
        />
      </Box>
    </Flex>
  );
};

export default Index;

const Index4 = () => {
  return (
    <Box
      width={['100%', '75%', '50%']}
      p="2"
      _odd={{
        borderRight: '1px solid gray',
      }}
      _even={{
        base: { borderLeft: '1px solid gray' },
        md: { borderLeft: '0px solid gray' },
      }}
      borderBottom="1px solid gray"
    >
      <Flex>
        <Spacer />
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          boxSize={[100, 150, 150, 200]}
        />
      </Flex>
      {/* <NewsCardActions /> */}
    </Box>
  );
};

const Index3 = () => {
  return (
    <Flex
      width={['100%', '75%', '50%']}
      p="2"
      alignItems="center"
      // _first={{
      //   base: { borderTop: '1px solid gray' },
      //   md: { borderTop: '0px solid gray' },
      // }}
      _odd={{
        borderRight: '1px solid gray',
      }}
      _even={{
        base: { borderLeft: '1px solid gray' },
        md: { borderLeft: '0px solid gray' },
      }}
      borderBottom="1px solid gray"
    >
      <Box flexGrow="1" pr={1}>
        <Author
          image="https://bit.ly/tioluwani-kolawole"
          // image={Img}
          full_name="Kola Tioluwani"
          short_name="imsamad"
        />
        <Heading
          fontSize={{ base: 'sm', sm: 'md' }}
          lineHeight="tall"
          noOfLines={[1, 2, 2]}
        >
          Finding customers for your new business
        </Heading>
        <Badge variant="solid">Marketing</Badge>

        <Text
          mt={2}
          color="gray.500"
          noOfLines={[1, 1, 1, 2]}
          display={['none', 'none', '-webkit-box']}
        >
          Getting a new business off the ground is a lot of hard work. Here are
          five ideas you can use to find your first customers.
        </Text>
      </Box>
      <Box maxW={[100, 140, 150]} maxH={[100, 140, 150]}>
        <Image
          src="/image.jpeg"
          // src="https://bit.ly/2jYM25F"
          alt="Woman paying for a purchase"
        />
      </Box>
    </Flex>
  );
};

const Index2 = () => {
  return (
    <Flex alignItems="center" width={['100%', '100%', '50% ']}>
      <Box>
        <Author
          image="https://bit.ly/tioluwani-kolawole"
          // image={Img}
          full_name="Kola Tioluwani"
          short_name="imsamad"
        />
        <Heading
          fontSize={{ base: 'sm', sm: 'md' }}
          lineHeight="tall"
          noOfLines={2}
        >
          Finding customers for your new business
        </Heading>
        <Badge variant="solid" display={['none', 'inline-block']}>
          Marketing
        </Badge>
        <Text
          mt={2}
          color="gray.500"
          noOfLines={2}
          display={['none', 'block', 'block']}
        >
          Getting a new business off the ground is a lot of hard work. Here are
          five ideas you can use to find your first customers.
        </Text>
        <NewsCardActions />
      </Box>
      <Box maxW={[100, 150, 250]} maxH={[100, 120, 230]}>
        <Image
          borderRadius="sm"
          src="/image.jpeg"
          // src="https://bit.ly/2jYM25F"
          alt="Woman paying for a purchase"
        />
      </Box>
    </Flex>
  );
};
