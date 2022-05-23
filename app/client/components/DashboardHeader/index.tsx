import { StarIcon, TriangleDownIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Heading,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';

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
  header = 'My Dashboard',
}: {
  type:
    | 'collections'
    | 'stories'
    | 'account'
    | 'imcollabing'
    | 'allUsers'
    | 'allStories';
  header?: string;
}) => {
  const size = useBreakpointValue({ base: 'sm', md: 'md' });
  const { auth } = useAuthCtx();
  const isAdmin = auth?.user?.role == 'admin';
  return (
    <Container maxW="container.lg" border="0px" p={0}>
      <HStack mt={4} justifyContent="space-between" border="0px">
        <Heading
          fontSize="3xl"
          textAlign="center"
          fontWeight={700}
          fontStyle="italic"
          wordBreak="keep-all"
        >
          {header}
        </Heading>
        <WriteBtn />
      </HStack>
      <Divider mt={4} />
      <ButtonGroup border="0px" overflow="auto" w="full" mt={4} pb={4}>
        {isAdmin && (
          <>
            <MyLink href="/me/admin" w="full">
              <Button
                {...props(size, type == 'allUsers')}
                colorScheme="green"
                rightIcon={<StarIcon />}
              >
                All Users
              </Button>
            </MyLink>
            <MyLink href="/me/admin/stories" w="full">
              <Button
                {...props(size, type == 'allStories')}
                colorScheme="green"
                rightIcon={<StarIcon />}
              >
                All Stories
              </Button>
            </MyLink>
          </>
        )}
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
    </Container>
  );
};

export default DashboardHeader;
