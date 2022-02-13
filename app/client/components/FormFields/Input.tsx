import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldProps, FastField } from 'formik';
import { typeOf } from '../../lib/utils';

type Props = {
  label?: string;
  LeftAddOn?: string | React.ReactNode;
  rightAddOn?: string | React.ReactNode;
  helperText?: string;
  name: string;
  placeholder?: string;
  size?: string;
  isRequired?: boolean | false;
};

const CustomInput = ({
  label,
  LeftAddOn,
  rightAddOn,
  helperText,
  name,
  placeholder,
  size,
  isRequired,
  ...rest
}: Props) => {
  return (
    <FastField name={name}>
      {({ meta, field }: FieldProps) => {
        const isError: boolean = Boolean(meta.error && meta.touched);
        // @ts-ignore
        console.log('meta.error ', meta.error);
        return (
          <FormControl isInvalid={isError} isRequired={isRequired}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputGroup size={size ? size : 'md'}>
              {LeftAddOn && <InputLeftAddon>{LeftAddOn}</InputLeftAddon>}
              <Input {...field} id={name} placeholder={placeholder} {...rest} />
              {rightAddOn && <InputRightAddon>{rightAddOn}</InputRightAddon>}
            </InputGroup>
            {!isError && helperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
            {/* @ts-ignore */}
            {isError && typeOf(meta.error, 'array') ? (
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
    </FastField>
  );
};

export default CustomInput;
