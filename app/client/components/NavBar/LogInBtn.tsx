import { Button } from '@chakra-ui/react';

import useAuthCtx from '../Context/useAuthCtx';
import MyLink from '../MyLink';

const LogInBtn = () => {
  const { user } = useAuthCtx();
  return user ? (
    <MyLink href="/me">
      <Button size="md" mx={[1, 4]}>
        Profile
      </Button>
    </MyLink>
  ) : (
    <MyLink href="/auth">
      <Button size="md" mx={[1, 4]}>
        Login
      </Button>
    </MyLink>
  );
};

export default LogInBtn;
