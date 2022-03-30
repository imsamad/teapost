import { HStack, Spacer } from "@chakra-ui/react";
import SwitchTypeButton from "./SwitchTypeButton";

const Footer = () => {
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
      <SwitchTypeButton type="forgotPassword" />

      <Spacer />
      <SwitchTypeButton type="forgotIdentifier" />
    </HStack>
  );
};
export default Footer;
