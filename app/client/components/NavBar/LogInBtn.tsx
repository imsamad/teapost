import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import useUser from "../../lib/useUser";
import { useAuthCtx } from "../Context";

import MyLink from "../MyLink";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { ChevronDownIcon } from "@chakra-ui/icons";
const LogInBtn = () => {
  const { user, logout } = useUser();
  const { login } = useAuthCtx();
  return user ? (
    <Menu>
      <MenuButton mx={[1, 4]} as={Button} rightIcon={<ChevronDownIcon />}>
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MyLink href="/me">
            <MenuItem>My Account </MenuItem>
          </MyLink>

          <MenuItem
            onClick={() => logout()}
            icon={<RiLogoutCircleRLine />}
            color="red.500"
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  ) : (
    <Button size="md" mx={[1, 4]} onClick={() => login.onOpen()}>
      Login
    </Button>
  );
};
export default LogInBtn;
