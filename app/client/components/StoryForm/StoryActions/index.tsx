import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Heading, HStack, Spacer } from "@chakra-ui/react";
import TSIconButton from "@compo/UI/TSIconButton";
import { useField } from "formik";

import IsPublished from "./IsPublished";
const Index = () => {
  const [{ value }] = useField("_id");
  return (
    <HStack justifyContent="flex-end" my="4">
      {/* <EmailFollwers />
      <Box h="20px" w="2px" border="2px" borderColor="gray.400" /> */}
      <HStack border="1px" borderRadius="md" p="1">
        <Heading fontSize="md">History</Heading>
        <TSIconButton
          as="a"
          // @ts-ignore
          target="_blank"
          variant="outline"
          color="blue"
          // @ts-ignore
          href={`/me/story/history/${value}`}
          size="sm"
          icon={<ExternalLinkIcon />}
          aria-label="History"
        />
      </HStack>
      <Spacer />
      <IsPublished />
    </HStack>
  );
};

export default Index;
