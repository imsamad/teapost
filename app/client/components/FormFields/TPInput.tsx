import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  FormHelperText,
  InputProps,
} from "@chakra-ui/react";
import { FieldProps, FastField } from "formik";
import { memo } from "react";

type Props = {
  label?: string;
  LeftAddOn?: string | React.ReactNode;
  rightAddOn?: string | React.ReactNode;
  helperText?: string;
  name: string;
  placeholder?: string;
  size?: string;
  isRequired?: boolean | false;
  inputProps?: InputProps;
};
import CustomError from "./CustomError";

const TPInput = ({
  label,
  LeftAddOn,
  rightAddOn,
  helperText,
  name,
  placeholder,
  size,
  isRequired,
  inputProps,
  ...rest
}: Props) => {
  return (
    <FastField name={name}>
      {({ meta, field }: FieldProps) => {
        const isError: boolean = Boolean(meta.error && meta.touched);

        return (
          <FormControl
            isInvalid={isError}
            isRequired={isRequired}
            {...rest}
            mt={2}
          >
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputGroup size={size ? size : "md"}>
              {LeftAddOn && <InputLeftAddon>{LeftAddOn}</InputLeftAddon>}
              <Input
                {...field}
                id={name}
                placeholder={placeholder}
                {...inputProps}
              />
              {rightAddOn && <InputRightAddon>{rightAddOn}</InputRightAddon>}
            </InputGroup>
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

export default memo(TPInput);
