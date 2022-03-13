import {
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { FieldProps, FastField } from "formik";

type Props = {
  label?: string;
  LeftAddOn?: string | React.ReactNode;
  rightAddOn?: string | React.ReactNode;
  helperText?: string;
  name: string;
  placeholder?: string;
  size?: string;
  isRequired?: boolean | false;
  resize?: string;
};
import CustomError from "./CustomError";

const TPTextarea = ({
  label,
  LeftAddOn,
  rightAddOn,
  helperText,
  name,
  placeholder,
  size,
  isRequired,
  resize = "vertical",
  ...rest
}: Props) => {
  return (
    <FastField name={name}>
      {({ meta, field }: FieldProps) => {
        const isError: boolean = Boolean(meta.error && meta.touched);

        return (
          <FormControl isInvalid={isError} isRequired={isRequired}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <Textarea
              {...field}
              isInvalid={isError}
              placeholder={placeholder}
              id={name}
              size={size}
              {...rest}
            />
            {!isError && helperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
            {/* @ts-ignore */}
            <CustomError errors={meta.error} isError={isError} />
          </FormControl>
        );
      }}
    </FastField>
  );
};

export default TPTextarea;
