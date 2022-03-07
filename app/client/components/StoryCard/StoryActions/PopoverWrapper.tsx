import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useAuthCtx, useUICtx } from "../../Context";

const Index = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { login } = useUICtx();
  const { user } = useAuthCtx();

  return user ? (
    <Box onClick={onClick} border="2px solid red">
      {children}
    </Box>
  ) : (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box onClick={onOpen}>{children}</Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>You are not Logged In</PopoverHeader>
        <PopoverFooter d="flex" alignItems="center" justifyContent="flex-end">
          <Button
            size="sm"
            colorScheme="green"
            onClick={() => {
              onClose();
              login.onOpen();
            }}
          >
            Log In
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default Index;
