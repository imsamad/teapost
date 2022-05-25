import {
  Box,
  Collapse,
  Container,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Spinner,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';

import MyLink from '../MyLink';
import DarkMode from '../DarkMode';
import LogInBtn from './LogInBtn';
import TSSearch from './TSSearch copy';
const Index = () => {
  const size = useBreakpointValue(['md', 'md']);
  const serachFieldFormSm = useDisclosure();
  const showBelowSm = { display: ['flex', 'flex', 'none'] };
  const showAboveSm = { display: ['none', 'none', 'inline-block'] };
  return (
    <>
      <Container maxW="container.lg">
        <HStack px={1} py={3}>
          <MyLink href="/">
            <Heading
              as="h1"
              textTransform="uppercase"
              // fontStyle="italic"
              color="black"
              fontSize={['2xl', '2xl', '3xl']}
              fontWeight={900}
              _dark={{
                color: 'white',
              }}
            >
              Teapost
            </Heading>
          </MyLink>
          {/* @ts-ignore */}
          <Box {...showAboveSm} flex="1" pl={[undefined, 6]}>
            <TSSearch />
          </Box>
          <Box {...showBelowSm} flex="1" justifyContent="flex-end">
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
      </Container>
      <Collapse in={serachFieldFormSm.isOpen} animateOpacity>
        <Stack>
          <Stack my="4" {...showBelowSm} px={2}>
            <TSSearch size={size} />
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
};

export default Index;
