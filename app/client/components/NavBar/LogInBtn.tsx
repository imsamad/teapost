import {
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useAuthCtx } from "../Context";
import MyLink from "../MyLink";

const LogInBtn = () => {
  const { login, user, setUser } = useAuthCtx();
  return user?._id ? (
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
            onClick={() => setUser({})}
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
