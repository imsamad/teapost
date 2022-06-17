import {
  Avatar,
  Button,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FaPenNib } from 'react-icons/fa';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { useAuthCtx } from '../Context';
import MyLink from '../MyLink';
import { nanoid } from 'nanoid';
import { BiLogInCircle, BiUser } from 'react-icons/bi';
import { GrUserAdmin } from 'react-icons/gr';

const LogInBtn = ({ size }: { size: any }) => {
  const { loginModal, auth, logout } = useAuthCtx();

  if (typeof window == 'undefined') {
    return <></>;
  }
  return auth?.user?._id ? (
    <Menu isLazy flip size={size}>
      <MenuButton
        // _hover={{ bg: 'gray.50' }}
        borderRadius="full"
        // _expanded={{ bg: 'gray.50' }}
        _focus={{ boxShadow: 'none' }}
      >
        <HStack>
          <Avatar
            src={auth.user.profilePic}
            size="md"
            name={auth.user.username}
          />
          <ChevronDownIcon fontSize="xl" />
        </HStack>
      </MenuButton>
      <MenuList zIndex={10}>
        <MenuGroup
          title="Profile"
          fontWeight={800}
          letterSpacing={1}
          fontSize="md"
        >
          <Divider />
          <MyLink href="/me">
            <MenuItem icon={<BiUser />}>Dashboard </MenuItem>
          </MyLink>
          <MyLink href={`/me/stories/write/${nanoid(10)}`}>
            <MenuItem icon={<FaPenNib />} color="green.600">
              Write +
            </MenuItem>
          </MyLink>
          {auth.user.role == 'admin' && (
            <MyLink href="/me/admin">
              <MenuItem
                icon={<GrUserAdmin color="green.600" fontWeight={800} />}
                color="green.600"
                fontWeight={800}
              >
                Admin
              </MenuItem>
            </MyLink>
          )}
          <MenuItem
            onClick={() => logout('/auth')}
            icon={<RiLogoutCircleRLine />}
            color="red.500"
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  ) : (
    <Button
      mx={[1, 4]}
      onClick={() => loginModal.onOpen()}
      size={size}
      leftIcon={<BiLogInCircle />}
      colorScheme="blue"
    >
      Login
    </Button>
  );
};
export default LogInBtn;
