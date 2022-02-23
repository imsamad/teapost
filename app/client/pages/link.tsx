import { Box, Button, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import MyLink from '../components/MyLink';
const Index = () => {
  return (
    <Link href="/q?kkll=kk" target="_blank">
      <Box w="400px" p="10px" mx="auto" h="200px" border="1px solid red">
        <Link>Home</Link>

        <Button
          colorScheme="teal"
          variant="link"
          onClick={(e: any) => {
            // e.stopPropagation();
            e.preventDefault();
          }}
        >
          Button
        </Button>
      </Box>
    </Link>
  );
};

export default Index;
