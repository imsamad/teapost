import { Container } from '@chakra-ui/react';

import AccountForm from './AccountForm';
import ChangePwdEmailModal from './ChangePwdEmailModal';

const MyAccount = () => {
  return (
    <Container maxH="container.md" my={2}>
      <AccountForm />
      <ChangePwdEmailModal />
    </Container>
  );
};

export default MyAccount;
