import { IconButton, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiBellPlus } from 'react-icons/bi';
import { CheckIcon } from '@chakra-ui/icons';

import { useAuthCtx, useProfile } from '@compo/Context';
import { followAuthorApi } from '@lib/api/authApi';
import TSButton from '@compo/UI/TSButton';
import UserType from '@lib/types/UserType';

const FollowBtn = ({
  author,
  isFullBtn = false,
  followCB,
}: {
  author: UserType;
  isFullBtn?: boolean;
  followCB?: (hasBeenFollowing: boolean) => void;
}) => {
  const { myProfile, mutateProfile } = useProfile();
  const { openLoginToast } = useAuthCtx();

  const [stats, setStats] = useState({
    hasBeenFollowing: false,
    isItselfAuthor: false,
  });

  useEffect(() => {
    setStats({
      hasBeenFollowing: Boolean(
        myProfile?.profile?.following?.includes(author?._id || '')
      ),
      isItselfAuthor: myProfile?._id?.toString() == author._id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfile]);

  const loadingState = useDisclosure();

  const handleFollowing = async () => {
    loadingState.onOpen();
    if (!myProfile?._id) {
      openLoginToast();
      loadingState.onClose();
      return;
    }
    const data = await followAuthorApi(author._id, stats.hasBeenFollowing);
    if (data) {
      followCB && followCB(stats.hasBeenFollowing);
      await mutateProfile();
      loadingState.onClose();
    } else loadingState.onClose();
  };

  return (
    <>
      {!isFullBtn ? (
        <IconButton
          isLoading={loadingState.isOpen}
          isActive={stats.hasBeenFollowing}
          isDisabled={stats.isItselfAuthor}
          size="xs"
          icon={stats.hasBeenFollowing ? <CheckIcon /> : <BiBellPlus />}
          variant="outline"
          onClick={handleFollowing}
          isRound
          aria-label={`follow ${author.username}`}
        />
      ) : (
        <TSButton
          isLoading={loadingState.isOpen}
          isActive={stats.hasBeenFollowing}
          isDisabled={stats.isItselfAuthor}
          // @ts-ignore
          rightIcon={stats.hasBeenFollowing && <CheckIcon />}
          colorScheme="purple"
          variant="outline"
          borderRadius="lg"
          onClick={handleFollowing}
          size="sm"
        >
          {stats.hasBeenFollowing ? 'Following' : 'Follow'}
        </TSButton>
      )}
    </>
  );
};

export default FollowBtn;
