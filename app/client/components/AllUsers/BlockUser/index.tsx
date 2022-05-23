import {
  Button,
  Heading,
  HStack,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useResetData } from '@compo/ReactTableCtxProvider';
import { blockUnBlockUsersAdminApi } from '@lib/api/adminApi';
import { useEffect, useState } from 'react';

const BlockUsers = ({
  userIds,
  showCheckBox,
  isAuthorised: isAuthorisedProp,
}: {
  userIds: string[];
  showCheckBox?: boolean;
  isAuthorised?: boolean;
}) => {
  const { resetData } = useResetData();

  const isLoading = useDisclosure();
  const toast = useToast();
  const [isAuthorised, setIsAuthorised] = useState(isAuthorisedProp);

  useEffect(() => {
    isAuthorisedProp != isAuthorised && setIsAuthorised(isAuthorisedProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorisedProp]);

  const handleClick = async (isBlock: boolean) => {
    try {
      await blockUnBlockUsersAdminApi({ userIds, isBlock });
      if (showCheckBox) setIsAuthorised(!isAuthorised);
      else await resetData();
    } catch {
      toast({
        status: 'error',
        title: `Can't carry out opertaion server is busy, please try again`,
        isClosable: true,
        duration: 400,
      });
    }
  };

  return (
    <HStack>
      {showCheckBox ? (
        <VStack>
          <Switch
            size="lg"
            colorScheme="teal"
            isChecked={!isAuthorised}
            onChange={() => handleClick(!!isAuthorised)}
          />
          <Heading size="sm">{isAuthorised ? 'Block' : 'Unblock'}</Heading>
          {isLoading.isOpen && <Spinner color="red.500" />}
        </VStack>
      ) : (
        <>
          <Button colorScheme="orange" onClick={() => handleClick(true)}>
            Block
          </Button>
          <Button colorScheme="green" onClick={() => handleClick(false)}>
            UnBlock
          </Button>
        </>
      )}
    </HStack>
  );
};

export default BlockUsers;
