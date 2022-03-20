import { IconButton, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiBellPlus, BiBellMinus } from "react-icons/bi";

import { useAuthCtx, useProfile } from "@compo/Context";

import { followAuthor } from "@lib/api/authApi";

import UserType from "@lib/types/UserType";

const Follow = ({ author }: { author: UserType }) => {
  const { profile, mutateProfile } = useProfile();
  const { openLoginToast } = useAuthCtx();

  const [stats, setStats] = useState({
    hasBeenFollowing: false,
    isItselfAuthor: false,
  });

  useEffect(() => {
    setStats({
      hasBeenFollowing: Boolean(
        profile?.following?.includes(author?._id || "")
      ),
      isItselfAuthor: profile._id?.toString() == author._id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const loadingState = useDisclosure();

  const handleFollowing = async () => {
    loadingState.onOpen();
    if (!profile?._id) {
      openLoginToast();
      loadingState.onClose();
      return;
    }
    const data = await followAuthor(author._id, stats.hasBeenFollowing);
    if (data) {
      await mutateProfile();
      loadingState.onClose();
    } else loadingState.onClose();
  };

  return (
    <IconButton
      isLoading={loadingState.isOpen}
      isActive={stats.hasBeenFollowing}
      isDisabled={stats.isItselfAuthor}
      icon={
        stats.hasBeenFollowing ? (
          <BiBellMinus color="rgba(0,0,255,0.6)" fontSize="19px" />
        ) : (
          <BiBellPlus fontSize="19px" />
        )
      }
      onClick={handleFollowing}
      //
      _active={{
        border: "2px solid rgba(0,0,255,0.4)",
      }}
      _focus={{
        border: "1px solid gray",
        bgColor: "transparent",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        MozBackfaceVisibility: "hidden",
      }}
      size="xs"
      isRound
      aria-label={`follow ${author.username}`}
    />
  );
};

export default Follow;
