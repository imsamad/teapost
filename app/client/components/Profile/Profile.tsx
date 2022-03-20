import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
const types = [
  "line",
  "enclosed",
  "enclosed-colored",
  "soft-rounded",
  "solid-rounded",
  "unstyled",
];
const Profile = () => {
  return (
    <>
      {types.map((type) => (
        <Box key={type} border="0px" h="100%" my="20" borderBottom="2px">
          <Heading fontSize="md">{type}</Heading>
          <Tabs
            align="center"
            isFitted
            variant={type}
            size="xs"
            colorScheme="cyan"
          >
            <TabList flexWrap="wrap">
              <Tab
                border="1px"
                m="1"
                _focus={{
                  outline: "none",
                }}
              >
                Reading Collections
              </Tab>
              <Tab
                border="1px"
                m="1"
                _focus={{
                  outline: "none",
                }}
              >
                Draft Stories
              </Tab>
              <Tab
                border="1px"
                m="1"
                _focus={{
                  outline: "none",
                }}
              >
                Published Stories
              </Tab>
              <Tab
                border="1px"
                m="1"
                _focus={{
                  outline: "none",
                }}
              >
                Profile
              </Tab>
              <TabPanels>
                <TabPanel>One</TabPanel>
                <TabPanel>Two</TabPanel>
                <TabPanel>Three</TabPanel>
                <TabPanel>Four</TabPanel>
              </TabPanels>
            </TabList>
          </Tabs>
        </Box>
      ))}
    </>
  );
};

export default Profile;
