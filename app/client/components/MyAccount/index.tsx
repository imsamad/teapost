import { ButtonGroup, Container, useDisclosure } from "@chakra-ui/react";
import TSButton from "@compo/UI/TSButton";
import ChangePwdEmail from "./ChangePwdEmail";

import From from "./Form";
import ProfilePic from "./Form/ProfilePic";

const MyAccount = () => {
  const openPwd = useDisclosure();
  const openEmail = useDisclosure();
  return (
    <Container maxH="container.md" my={2}>
      <ProfilePic />
      <From />

      <ButtonGroup display="flex" my={2}>
        <TSButton size="sm" flex="0.5" onClick={openEmail.onOpen}>
          Edit Email
        </TSButton>
        <ChangePwdEmail
          type="changeEmail"
          onClose={openEmail.onClose}
          isOpen={openEmail.isOpen}
        />
        <TSButton size="sm" flex="0.5" onClick={openPwd.onOpen}>
          Edit Password
        </TSButton>
        <ChangePwdEmail
          type="changePassword"
          onClose={openPwd.onClose}
          isOpen={openPwd.isOpen}
        />
      </ButtonGroup>
    </Container>
  );
};

export default MyAccount;
