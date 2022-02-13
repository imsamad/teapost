import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useBoolean,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';

import { RiLockPasswordFill as PasswordIcon } from 'react-icons/ri';
import { typeOf } from '../../lib/utils';

type Props = {
  label?: string;
  name: string;
  placeholder?: string | 'Enter your password';
  helperText?: string;
  LeftAddOn?: string | React.ReactNode;
};

const PasswordField = ({
  name,
  placeholder,
  helperText,
  LeftAddOn,
  label,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useBoolean();
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const isError: boolean = Boolean(meta.error && meta.touched);
        return (
          <FormControl isInvalid={isError}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputGroup>
              <InputLeftAddon>
                {LeftAddOn ? LeftAddOn : <PasswordIcon color="gray.300" />}
              </InputLeftAddon>
              <Input
                pr="4.5rem"
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
            {!isError && helperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
            {/* @ts-ignore */}
            {isError && typeOf(meta.error, 'array') && meta?.error.length ? (
              // @ts-ignore
              [...new Set(meta?.error)].map((err: string) => (
                <FormErrorMessage key={err}>{err}</FormErrorMessage>
              ))
            ) : (
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    </Field>
  );
};
export default PasswordField;
