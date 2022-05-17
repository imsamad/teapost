import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { BiHomeHeart } from 'react-icons/bi';
import Head from 'next/head';
import MyLink from '../components/MyLink';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404:-Not Found</title>
      </Head>

      <Box maxW="xl" mx="auto" textAlign="center" pt="10">
        <Heading> 404 - Page Not Found</Heading>
        <Text fontSize="2xl" my="4">
          You just hit a route that doesn{`'`}t exist... the sadness.😢
        </Text>
        <MyLink href="/">
          <Button size="lg" leftIcon={<BiHomeHeart />}>
            Back To Home
          </Button>
        </MyLink>
      </Box>
    </>
  );
}
