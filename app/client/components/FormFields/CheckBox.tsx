import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { Field, FieldProps, Formik, FastField, useField } from 'formik';
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
  const [, meta] = useField(name);
  const isError = Boolean(meta.error && meta.touched);
  return (
    <FormControl isInvalid={isError}>
      {label && <FormLabel>{label}</FormLabel>}
      <Stack direction={direction} wrap={'wrap'}>
        {data.map((option: any) => {
          // console.log('chekbox data');
          const value = dataKeys ? option[dataKeys[0]] : option.key,
            label = dataKeys ? option[dataKeys[1]] : option.label;
          return (
            <FastField key={value} name={name} value={value} type="checkbox">
              {({ field }: any) => {
                // console.log('chekbox data option');
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
};

export default Index;
