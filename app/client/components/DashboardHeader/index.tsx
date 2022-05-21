import { Button, ButtonGroup, Heading } from '@chakra-ui/react';

import MyLink from '@compo/MyLink';

const fo = {
  _focus: { outline: 'none' },
  colorScheme: 'blue',
  isFullWidth: true,
  // borderRadius: "0",
  borderBottomRadius: 0,
};

const DashboardHeader = ({
  type,
}: {
  type: 'collections' | 'stories' | 'account' | 'imcollabing';
}) => {
  return (
    <>
      <Heading fontSize="3xl" textAlign="center" my={3} fontWeight={700}>
        My Dashboard
      </Heading>
      <ButtonGroup justifyContent="center" display="flex" border="0px">
        <MyLink href="/me">
          <Button
            {...fo}
            // @ts-ignore
            borderBottom={type == 'collections' && '0'}
            variant={type == 'collections' ? 'outline' : 'solid'}
          >
            Reading List
          </Button>
        </MyLink>
        <MyLink href="/me/stories">
          <Button
            {...fo}
            // @ts-ignore
            borderBottom={type == 'stories' && '0'}
            variant={type == 'stories' ? 'outline' : 'solid'}
          >
            MyStories
          </Button>
        </MyLink>
        <MyLink href="/me/stories/imcollabing">
          <Button
            {...fo}
            // @ts-ignore
            borderBottom={type == 'imcollabing' && '0'}
            variant={type == 'imcollabing' ? 'outline' : 'solid'}
          >
            IAMcollabing
          </Button>
        </MyLink>
        <MyLink href="/me/account">
          <Button
            {...fo}
            // @ts-ignore
            borderBottom={type == 'account' && '0'}
            variant={type == 'account' ? 'outline' : 'solid'}
          >
            Profile
          </Button>
        </MyLink>
      </ButtonGroup>
      <Heading fontSize="2xl" textAlign="center" my={3} fontWeight={400}>
        {type == 'stories'
          ? 'My Stories'
          : type == 'collections'
          ? 'My Collections'
          : type == 'imcollabing'
          ? 'I AM Collabing In stories'
          : 'My Account'}
      </Heading>
    </>
  );
};

export default DashboardHeader;
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
