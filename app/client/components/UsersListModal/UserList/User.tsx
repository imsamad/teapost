import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Checkbox,
  Heading,
  HStack,
  Link,
  Spacer,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import UserType from '@lib/types/UserType';
import { ChangeEvent, useState } from 'react';

const User = ({
  user,
  onClickCB,
  isChecked: isCheckedProp,
}: {
  user: UserType;
  onClickCB?: (userId: string, isChecked: boolean) => Promise<boolean>;
  isChecked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(isCheckedProp);
  const isLoading = useDisclosure();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onClickCB) return;
    isLoading.onOpen();
    onClickCB(user._id, e.target.checked)
      .then((isChecked) => {
        setIsChecked(isChecked);
      })
      .finally(() => {
        isLoading.onClose();
      });
  };
  return (
    <HStack
      mb="4px"
      py="8px"
      borderBottom="1px"
      borderColor="gray.100"
      outline="2px"
    >
      <Avatar name={user.fullName} src={user.profilePic} />
      <Stack justifyContent="center">
        <Text color="muted" size="sm">
          {user.fullName}
        </Text>
        <Heading size="sm">{user.username}</Heading>
      </Stack>
      <Spacer />
      <Link href={`/@/${user.username}`} isExternal>
        <ExternalLinkIcon mx="6px" />
      </Link>
      {isLoading.isOpen ? (
        <Spinner />
      ) : (
        <Checkbox
          size="lg"
          onChange={handleChange}
          isChecked={isChecked}
          isDisabled={!onClickCB}
        />
      )}
    </HStack>
  );
};

export default User;
