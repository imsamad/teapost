import {
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

import CustomError from "./CustomError";

type Props = {
  label?: string;
  helperText?: string;
  name: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  isRequired?: boolean | false;
  data: { key: string | number; label: string }[];
};

const TPSelect = ({
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
            {/* @ts-ignore */}
            <CustomError isError={isError} error={meta.error} />
          </FormControl>
        );
      }}
    </Field>
  );
};

export default TPSelect;
