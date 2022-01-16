import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Switch,
  useColorMode,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex alignItems="center" py={4} as="nav">
      <Heading as="h1" textTransform="uppercase" fontStyle="italic">
        Teapost
      </Heading>
      <Spacer />
      <InputGroup
        maxW="md"
        size="md"
        overflow="hidden"
        mx={[1, 4]}
        display={['none', 'none', 'flex']}
      >
        <InputLeftElement
          pointerEvents="none"
          // eslint-disable-next-line react/no-children-prop
          children={<Search2Icon color="gray.300" />}
        />
        <Input placeholder="Enter or ctrl + /" variant="filled" />
      </InputGroup>
      <Switch
        size="lg"
        onChange={toggleColorMode}
        name="colorMode"
        value={colorMode}
        isChecked={colorMode === 'dark'}
      />
      <Button size={'sm'} colorScheme="blue" mx={[1, 4]}>
        Sign Up
      </Button>
      <Button size="sm" colorScheme="blue">
        Log in
      </Button>
    </Flex>
  );
};

export default Index;
