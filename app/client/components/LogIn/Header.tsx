import { Heading } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

const Header = () => {
  const {
    values: { isRegister },
  } = useFormikContext();
  return (
    <Heading size="lg" textAlign="center" my="4px">
      {isRegister ? 'Register' : 'Log In'}
    </Heading>
  );
};

export default Header;
