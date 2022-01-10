import { Badge, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

import NewsCardActions from '../NewsCardActions';
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
