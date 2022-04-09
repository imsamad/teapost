import { Button, ButtonGroup, Heading } from "@chakra-ui/react";

import MyLink from "@compo/MyLink";

const fo = {
  _focus: { outline: "none" },
  colorScheme: "blue",
  isFullWidth: true,
  // borderRadius: "0",
  borderBottomRadius: 0,
};

const Profile = ({ type }: { type: "collections" | "stories" | "account" }) => {
  return (
    <>
      <Heading fontSize="lg" textAlign="center" my={3}>
        My Dashboard
      </Heading>
      <ButtonGroup justifyContent="center" display="flex" border="0px">
        <MyLink href="/me">
          <Button
            {...fo}
            // @ts-ignore
            borderBottom={type == "collections" && "0"}
            variant={type == "collections" ? "outline" : "solid"}
          >
            Reading List
          </Button>
        </MyLink>
        <MyLink href="/me/stories">
          <Button
            {...fo}
            // @ts-ignore
            borderBottom={type == "stories" && "0"}
            variant={type == "stories" ? "outline" : "solid"}
          >
            Stories
          </Button>
        </MyLink>
        <MyLink href="/me/account">
          <Button
            {...fo}
            // @ts-ignore
            borderBottom={type == "account" && "0"}
            variant={type == "account" ? "outline" : "solid"}
          >
            Profile
          </Button>
        </MyLink>
      </ButtonGroup>
      {/* {type == "collections" ? (
        <MyCollections
          mycollections={data?.mycollections}
          isInitial={true}
          nextPageNo={2}
        />
      ) : type == "stories" ? (
        <MyStories />
      ) : (
        <Account />
      )} */}
    </>
  );
};

export default Profile;
/*
const Temp = () => (
  <Tabs
    isLazy={true}
    // align="center"
    defaultIndex={type == "collections" ? 0 : type == "stories" ? 1 : 2}
    isFitted
    variant="enclosed-colored"
    colorScheme="purple"
  >
    <TabList>
      <Tab {...fo} as={MyLink} href="/me/">
        Reading Collections
      </Tab>
      <Tab {...fo} as={MyLink} href="/me/stories">
        Stories
      </Tab>
      <Tab {...fo} as={MyLink} href="/me/account">
        Profile
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Collections />
      </TabPanel>
      <TabPanel>
        <MyStories />
      </TabPanel>
      <TabPanel>
        <Account />
      </TabPanel>
    </TabPanels>
  </Tabs>
);*/
