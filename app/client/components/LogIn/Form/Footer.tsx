import { HStack, Link, Spacer } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";

import MyLink from "../../MyLink";
import { AuthType } from "./index";
const Footer = () => {
  // const [, { value: isRegister }, { setValue }] = useField("isRegister");
  const {
    values: { isRegister },
    setStatus,
    setErrors,
    setFieldValue,
  } = useFormikContext<AuthType>();
  return (
    <HStack
      fontSize="md"
      sx={{
        color: "blue.600",
        textDecoration: "underline",
      }}
      _dark={{
        color: "teal.400",
      }}
    >
      <Link
        as="button"
        type="button"
        onClick={() => {
          setFieldValue("isRegister", !isRegister, false);
          setErrors({});
          setStatus(null);
        }}
        _visited={{
          outline: "none",
          color: "blue.400",
        }}
        _focus={{
          outline: "none",
          color: "blue.300",
        }}
        _hover={{
          color: "blue.500",
        }}
      >
        {isRegister ? "Log In" : "Register"}
      </Link>

      <Spacer />
      <MyLink href="/auth/register">Forgot Password</MyLink>
    </HStack>
  );
};
export default Footer;
