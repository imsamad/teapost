import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useBoolean,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";

import CustomError from "./CustomError";

type Props = {
  label?: string;
  name: string;
  placeholder?: string | "Enter your password";
  helperText?: string;
  LeftAddOn?: string | React.ReactNode;
  noLeftAddon?: boolean;
};

const TPPassword = ({
  name,
  placeholder,
  helperText,
  LeftAddOn,
  noLeftAddon = false,
  label,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useBoolean();
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => {
        const isError: boolean = Boolean(meta.error && meta.touched);
        return (
          <FormControl isInvalid={isError}>
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <InputGroup>
              {!noLeftAddon && (
                <InputLeftAddon>
                  {LeftAddOn ? LeftAddOn : <PasswordIcon color="gray.300" />}
                </InputLeftAddon>
              )}
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                id={name}
                {...field}
                {...rest}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={setShowPassword.toggle}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!isError && helperText && (
              <FormHelperText>{helperText}</FormHelperText>
            )}
            {/* @ts-ignore */}
            <CustomError isError={isError} errors={meta.error} />
          </FormControl>
        );
      }}
    </Field>
  );
};
export default TPPassword;
