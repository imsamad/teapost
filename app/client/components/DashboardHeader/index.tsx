import { TriangleDownIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import MyLink from '@compo/MyLink';
import WriteBtn from '@compo/WriteBtn';

const props = (size?: string, showIcon?: boolean) => ({
  _focus: { outline: 'none' },
  colorScheme: 'twitter',
  isFullWidth: true,
  // borderRadius: "0",
  borderBottomRadius: 0,
  borderBottom: 0,
  size,
  leftIcon: showIcon ? <TriangleDownIcon /> : <></>,
  variant: showIcon ? 'outline' : 'solid',
});

const DashboardHeader = ({
  type,
}: {
  type: 'collections' | 'stories' | 'account' | 'imcollabing';
}) => {
  const size = useBreakpointValue({ base: 'sm', md: 'md' });
  return (
    <Container maxW="container.lg">
      <HStack mt={4} justifyContent="space-between" border="0px">
        <Heading
          fontSize="3xl"
          textAlign="center"
          fontWeight={700}
          fontStyle="italic"
        >
          My Dashboard
        </Heading>
        <WriteBtn />
      </HStack>
      <Divider mt={4} />
      <ButtonGroup border="0px" overflow="auto" w="full" mt={4}>
        <MyLink href="/me" w="full">
          <Button {...props(size, type == 'collections')}>Reading List</Button>
        </MyLink>
        <MyLink href="/me/stories" w="full">
          <Button {...props(size, type == 'stories')}>MyStories</Button>
        </MyLink>
        <MyLink href="/me/stories/imcollabing" w="full">
          <Button {...props(size, type == 'imcollabing')}>IAMcollabing</Button>
        </MyLink>
        <MyLink href="/me/account" w="full">
          <Button {...props(size, type == 'account')}>Profile</Button>
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
    </Container>
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
