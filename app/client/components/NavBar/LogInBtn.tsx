import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaPenNib } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { useAuthCtx } from "../Context";
import MyLink from "../MyLink";
import { nanoid } from "nanoid";
import { BiUser } from "react-icons/bi";

const LogInBtn = ({ size }: { size: any }) => {
  const { login, user, setUser } = useAuthCtx();
  return user?._id ? (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size={size}>
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <Divider />
          <MyLink href="/me">
            <MenuItem icon={<BiUser />}>My Account </MenuItem>
          </MyLink>
          <MyLink href={`/me/story/write/${nanoid(10)}`}>
            <MenuItem icon={<FaPenNib />} color="green.600">
              Write
            </MenuItem>
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
    <Button mx={[1, 4]} onClick={() => login.onOpen()} size={size}>
      Login
    </Button>
  );
};
export default LogInBtn;
