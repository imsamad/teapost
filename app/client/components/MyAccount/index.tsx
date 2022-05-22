import { Container } from '@chakra-ui/react';

import AccountForm from './AccountForm';
import ChangePwdEmailModal from './ChangePwdEmailModal';
import DeleteAccount from './DeleteAccount';

const MyAccount = () => {
  return (
    <Container maxH="container.md" my={2}>
      <AccountForm />
      <ChangePwdEmailModal />
      <DeleteAccount />
    </Container>
  );
};

export default MyAccount;
