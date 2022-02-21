import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { Field, Formik, FastField, useField } from 'formik';
import { typeOf } from '../../lib/utils';

type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';

type Props = {
  name: string;
  data: { key: string; label: string }[];
  dataKeys?: [string, string];
  label?: string;
  helperText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  direction?: Direction[] | ['row'];
};

const Index = ({
  name,
  label,
  helperText,
  data,
  size = 'md',
  direction = ['row'],
  dataKeys,
}: Props) => {
  const fieldProps = useField(name);
  const [, meta] = fieldProps;

  const isError = Boolean(meta.error && meta.touched);
  return (
    <FormControl isInvalid={isError} size={size}>
      {label && <FormLabel>{label}</FormLabel>}
      {/* @ts-ignore */}
      {isError && typeOf(meta.error, 'array') ? (
        // @ts-ignore
        [...new Set(meta?.error)].map((err: string) => (
          <FormErrorMessage key={err}>{err}</FormErrorMessage>
        ))
      ) : (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
      <Stack direction={direction} wrap={'wrap'}>
        {data.map((option: any) => {
          const value = dataKeys ? option[dataKeys[0]] : option.key,
            label = dataKeys ? option[dataKeys[1]] : option.label;
          return (
            <FastField key={value} name={name} value={value} type="checkbox">
              {({ field }: any) => {
                return (
                  <Checkbox isChecked={field.checked} {...field} size={size}>
                    {label}
                  </Checkbox>
                );
              }}
            </FastField>
          );
        })}
      </Stack>
      {!isError && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Index;
