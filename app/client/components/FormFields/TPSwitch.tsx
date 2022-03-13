import {
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

import CustomError from "./CustomError";

type Props = {
  name: string;
  label?: string;
  helperText?: string;
  size?: string;
  isRequired?: boolean | false;
  colorScheme?: string;
};

const TPSwitch = ({
  name,
  size = "md",
  label,
  helperText,
  colorScheme = "blue",
  isRequired,
}: Props) => {
  return (
    <Field name={name} type="radio">
      {({ field, meta }: FieldProps) => {
        const isError = Boolean(meta.error && meta.touched);
        return (
          <FormControl isInvalid={isError} isRequired={isRequired}>
            {label && <FormLabel>{label}</FormLabel>}
            <Switch
              colorScheme={colorScheme}
              size={size}
              {...field}
              isChecked={meta.value}
            />
            {!isError && helperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
            {/* @ts-ignore */}
            <CustomError isError={isError} error={meta.error} />
          </FormControl>
        );
      }}
    </Field>
  );
};

export default TPSwitch;
