import {
  Box,
  Collapse,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Stack,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";

import MyLink from "../MyLink";
import DarkMode from "../DarkMode";
import LogInBtn from "./LogInBtn";
import TSSearch from "./TSSearch";

const Index = () => {
  const size = useBreakpointValue(["md", "md"]);
  const serachFieldFormSm = useDisclosure();
  const showBelowSm = { display: ["inline-block", "inline-block", "none"] };
  const showAboveSm = { display: ["none", "none", "inline-block"] };
  return (
    <>
      <HStack pt={1} as="nav">
        <MyLink href="/">
          <Heading
            as="h1"
            textTransform="uppercase"
            // fontStyle="italic"
            color="black"
            fontSize={["2xl", "2xl", "3xl"]}
            fontWeight={900}
            _dark={{
              color: "white",
            }}
          >
            Teapost
          </Heading>
        </MyLink>
        <Spacer />
        <Box {...showAboveSm}>
          <TSSearch />
        </Box>
        <Box {...showBelowSm}>
          <IconButton
            size={size}
            icon={serachFieldFormSm.isOpen ? <CloseIcon /> : <SearchIcon />}
            aria-label="search"
            onClick={serachFieldFormSm.onToggle}
          />
        </Box>
        <DarkMode size={size} />
        <LogInBtn size={size} />
      </HStack>
      <Collapse in={serachFieldFormSm.isOpen} animateOpacity>
        <Stack>
          <Stack mt="4" {...showBelowSm}>
            <TSSearch size={size} />
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
};

export default Index;
