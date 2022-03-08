import { Box, Divider, Heading, Link, Text } from "@chakra-ui/react";

const Index = () => {
  return (
    <Box textAlign="center" as="footer" py="2">
      <Divider my="4" />
      <Heading fontSize="md">Developed by</Heading>
      <Heading
        fontSize="xs"
        color="blue"
        textDecor="underline"
        _dark={{
          color: "teal.400",
        }}
      >
        <Link href="https://imsamad.com" my="4">
          Abdus Samad
        </Link>
      </Heading>
    </Box>
  );
};

export default Index;
