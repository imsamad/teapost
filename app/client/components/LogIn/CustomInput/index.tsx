import {
  Button,
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBoolean,
} from '@chakra-ui/react';
import { Field } from 'formik';
import { IconType } from 'react-icons';

import { RiLockPasswordFill as PasswordIcon } from 'react-icons/ri';

interface InputProps {
  name: string;
  rest?: any;
  placeholder: string;
}

interface ExtendInputProps extends InputProps {
  Icon: IconType;
}

export const Input = ({
  name,
  Icon,
  placeholder,
  ...rest
}: ExtendInputProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<Icon color="gray.300" />}
            />
            <ChakraInput
              placeholder={placeholder}
              id={name}
              {...field}
              {...rest}
            />
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export const PasswordField = ({ name, placeholder, ...rest }: InputProps) => {
  const [showPassword, setShowPassword] = useBoolean();
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<PasswordIcon color="gray.300" />}
            />
            <ChakraInput
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
              id={name}
              {...field}
              {...rest}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={setShowPassword.toggle}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
