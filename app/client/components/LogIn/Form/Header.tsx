import { Heading, HStack, Text } from '@chakra-ui/react';
import { toPascalCase } from '@lib/utils';
import { useField } from 'formik';
import SwitchTypeButton from './SwitchTypeButton';

const Header = () => {
  const [{ value: type }] = useField('type');

  return (
    <>
      <Heading size="lg" textAlign="center" my="4px">
        {toPascalCase(type)}
      </Heading>
      <HStack justify="center">
        {type == 'logIn' ? (
          <>
            <Text color="muted">Don&rsquo;t have an account?</Text>
            <SwitchTypeButton type="register" />
          </>
        ) : (
          <>
            <Text color="muted">Already registered. </Text>
            <SwitchTypeButton type="logIn" />
          </>
        )}
      </HStack>
    </>
  );
};

export default Header;
