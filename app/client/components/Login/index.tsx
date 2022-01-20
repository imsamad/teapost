import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

import MyLink from '../MyLink';

const Index = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box
      maxW="sm"
      mx="auto"
      py="10"
      px="4"
      border="1px"
      my="4"
      borderRadius="md"
      shadow="lg"
    >
      <Stack spacing={4}>
        <Heading size="lg" textAlign="center">
          Log In
        </Heading>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<FaUserAlt color="gray.300" />}
          />
          <Input type="tel" placeholder="Username or email" />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            // eslint-disable-next-line react/no-children-prop
            children={<RiLockPasswordFill color="gray.300" />}
          />
          <Input type={show ? 'text' : 'password'} placeholder="Password" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Flex
          alignItems="center"
          sx={{ fontSize: '12px', color: 'blue', textDecoration: 'underline' }}
        >
          <MyLink href="/auth/register" onHover="underline">
            Register
          </MyLink>
          <Spacer />
          <MyLink href="/auth/register" onHover="underline">
            Forgot Password
          </MyLink>
        </Flex>
        <Button isLoading={false} colorScheme="blue" size="sm">
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Index;
