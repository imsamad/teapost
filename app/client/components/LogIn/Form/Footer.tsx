import { Flex, HStack, Link, Spacer } from '@chakra-ui/react';
import { useField } from 'formik';
import MyLink from '../../MyLink';
const Footer = () => {
  const [, { value: isRegister }, { setValue }] = useField('isRegister');
  return (
    <HStack
      fontSize="sm"
      my="4px"
      sx={{
        color: 'blue',
        textDecoration: 'underline',
      }}
    >
      <Link
        as="button"
        type="button"
        onClick={() => setValue(!isRegister)}
        _visited={{
          outline: 'none',
        }}
        _focus={{
          outline: 'none',
        }}
        _hover={{
          color: 'blue.500',
        }}
      >
        {isRegister ? 'Log In' : 'Register'}
      </Link>

      <Spacer />
      <MyLink href="/auth/register">Forgot Password</MyLink>
    </HStack>
  );
};
export default Footer;
