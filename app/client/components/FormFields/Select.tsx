import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import { typeOf } from '../../lib/utils';

type Props = {
  label?: string;
  helperText?: string;
  name: string;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isRequired?: boolean | false;
  data: { key: string | number; label: string }[];
};

const CustomInput = ({
  label,
  helperText,
  name,
  placeholder,
  size,
  isRequired,
  data,
  ...rest
}: Props) => {
  return (
    <Field name={name}>
      {({ meta, field }: FieldProps) => {
        const isError: boolean = Boolean(meta.error && meta.touched);
        return (
          <FormControl isInvalid={isError} isRequired={isRequired}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Select id={name} {...field} {...rest} size={size}>
              {data.map((opt: any) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </Select>
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

export default CustomInput;
