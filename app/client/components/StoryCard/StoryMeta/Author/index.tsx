import {
  Avatar,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BiBellPlus, BiBellMinus } from "react-icons/bi";
import MyLink from "../../../MyLink";
import { useAuthCtx, useProfile } from "../../../Context";
import { useEffect, useState } from "react";
import { followAuthor } from "@lib/api/authApi";
import customToast from "../../customToast";

type propTypes = {
  username: string;
  email: string;
  id: string;
};

const Index = ({ author }: any) => {
  const { profile, mutateProfile } = useProfile();
  const [stats, setStats] = useState({
    hasBeenFollowing: false,
    isItselfAuthor: false,
  });
  useEffect(() => {
    setStats({
      // @ts-ignore
      hasBeenFollowing: profile?.following?.indexOf(author?._id) > -1,
      isItselfAuthor: profile._id?.toString() == author.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { login } = useAuthCtx();
  const toast = useToast();
  const handleFollowing = async () => {
    onOpen();
    if (!profile?._id) {
      toast({
        duration: 2000,
        isClosable: true,
        render: customToast(login.onOpen),
      });
      onClose();
      return;
    }
    const data = await followAuthor(author.id, stats.hasBeenFollowing);
    if (data) {
      await mutateProfile();
      onClose();
    } else onClose();
  };

  return (
    <HStack>
      <MyLink
        href={`/@/${author.username}`}
        _hover={{
          color: "blue.500",
        }}
      >
        <HStack>
          <Avatar size="2xs" name={author.username} src={author.profilePic} />

          <Text fontWeight={600} fontSize="sm" ml={1}>
            {author.username}
          </Text>
        </HStack>
      </MyLink>
      <IconButton
        isActive={stats.hasBeenFollowing}
        _active={{
          border: "2px solid rgba(0,0,255,0.4)",
        }}
        isLoading={isOpen}
        isDisabled={stats.isItselfAuthor}
        _focus={{
          border: "1px solid gray",
          bgColor: "transparent",
          boxShadow: "none",
          WebkitTapHighlightColor: "transparent",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          MozBackfaceVisibility: "hidden",
        }}
        icon={
          stats.hasBeenFollowing ? (
            <BiBellMinus color="rgba(0,0,255,0.6)" fontSize="19px" />
          ) : (
            <BiBellPlus fontSize="19px" />
          )
        }
        size="xs"
        isRound
        onClick={handleFollowing}
        aria-label={`follow ${author.username}`}
      />
    </HStack>
  );
};

export default Index;
