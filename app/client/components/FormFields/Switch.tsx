import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';
import { typeOf } from '../../lib/utils';

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  size?: string;
  isRequired?: boolean | false;
  colorScheme?: string;
};

const CustomSwitch = ({
  name,
  size = 'md',
  label,
  helperText,
  colorScheme = 'blue',
  isRequired,
}: Props) => {
  return (
    <Field name={name} type="radio">
      {({ field, meta }: FieldProps) => {
        const isError = Boolean(meta.error && meta.touched);
        return (
          <FormControl isInvalid={isError} isRequired={isRequired}>
            {label && <FormLabel>{label}</FormLabel>}
            <Switch colorScheme={colorScheme} size={size} {...field} />
            {!isError && helperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
            {isError && typeOf(meta.error, 'array') ? (
              // @ts-ignore
              meta?.error?.map((err: string) => (
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

export default CustomSwitch;
