import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { ChangeEvent, useCallback, useState } from "react";
import axios from "axios";
import StoryType from "@lib/types/StoryType";
import MyLink from "../MyLink";
const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
const TSSearch = ({ size }: any) => {
  const [results, setResults] = useState<any>(null);
  const [isQuery, setIsQuery] = useState("");
  const isFetching = useDisclosure();

  const debounce = (func: Function) => {
    let timer: any;
    return function (...args: any) {
      // @ts-ignore
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const fetchQuery = (e: any) => {
    const key = e.target.value;
    if (!key.split(" ").join("").length) {
      setResults(null);
    } else {
      isFetching.onOpen();
      axios
        .get(`${apiUrl}/stories?title=${key}&subtitle=${key}`)
        .then(({ data }) => {
          setResults(data?.stories.length ? data?.stories : null);
          isFetching.onClose();
        });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyUp = useCallback(debounce(fetchQuery), []);

  return (
    <Box position="relative">
      <MySearch
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (!e.target.value.split(" ").join("").length) setIsQuery("");
          else setIsQuery(e.target.value);
        }}
        size={size}
        value={isQuery}
        onKeyUp={handleKeyUp}
      />
      <Collapse in={Boolean(isQuery)}>
        <Box
          position="absolute"
          bgColor="white"
          border="1px"
          borderColor="gray.300"
          borderRadius="md"
          w="100%"
          mt="2"
          shadow="lg"
          maxH="300px"
          scrollMargin="5"
          overflowX="hidden"
          overflowY="auto"
          zIndex="toast"
          p="2"
          pt="1"
          onClick={() => {
            isFetching.onClose();
            setResults(null);
            setIsQuery("");
          }}
        >
          <Collapse in={isFetching.isOpen}>
            <HStack justifyContent="space-between" mb="2">
              <Text fontSize="sm" fontStyle="italic">
                Fetching...
              </Text>
              <CircularProgress isIndeterminate color="green.300" size="20px" />
            </HStack>
          </Collapse>
          <Collapse in={!isFetching.isOpen || results}>
            {results?.length ? (
              results.map((story: StoryType) => (
                <MyLink key={story._id} href={`/story/${story.slug}`}>
                  <Box
                    color="blue.500"
                    border="1px"
                    borderColor="gray.100"
                    borderRadius="md"
                    p="1"
                    mb="2"
                  >
                    <Heading fontSize="md" noOfLines={2}>
                      {story.title}
                    </Heading>
                    <Text size="sm" noOfLines={1}>
                      {story.subtitle}
                    </Text>
                  </Box>
                </MyLink>
              ))
            ) : (
              <Heading
                fontSize="sm"
                color="pink.200"
                textAlign="center"
                py="1"
                fontStyle="italic"
              >
                No result found.
              </Heading>
            )}
          </Collapse>
        </Box>
      </Collapse>
    </Box>
  );
};

export default TSSearch;

const MySearch = ({ onChange, size, value, onKeyUp }: any) => (
  <Box w="lg" maxW={["full", "md", "lg"]}>
    <InputGroup
      size={size ?? "md"}
      overflow="hidden"
      // display={["none", "none", "flex"]}
    >
      <InputLeftElement
        pointerEvents="none"
        // eslint-disable-next-line react/no-children-prop
        children={<Search2Icon color="gray.300" />}
      />
      <Input
        value={value}
        placeholder="Search"
        type="search"
        variant="filled"
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      {/* <InputRightElement
        // eslint-disable-next-line react/no-children-prop
        children={
          <Button
            size="xs"
            fontStyle="italic"
            color="red.500"
            variant="solid"
            border="1px"
            outline="none"
            _focus={{
              outline: "none",
            }}
            mr="8px"
          >
            Pro
          </Button>
        }
      /> */}
    </InputGroup>
  </Box>
);
