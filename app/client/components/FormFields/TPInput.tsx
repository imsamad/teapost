import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  FormHelperText,
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
  ...rest
}: Props) => {
  return (
    <FastField name={name}>
      {({ meta, field }: FieldProps) => {
        const isError: boolean = Boolean(meta.error && meta.touched);

        return (
          <FormControl isInvalid={isError} isRequired={isRequired}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputGroup size={size ? size : "md"}>
              {LeftAddOn && <InputLeftAddon>{LeftAddOn}</InputLeftAddon>}
              <Input {...field} id={name} placeholder={placeholder} {...rest} />
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

export default TPInput;
