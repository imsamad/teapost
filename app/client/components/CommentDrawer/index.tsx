import TSIconButton from "@compo/UI/TSIconButton";
import { BiCommentAdd } from "react-icons/bi";
import Router from "next/router";
import Drawer from "./Drawer";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const CommentDrawer = ({
  noOfComments,
  storyId,
}: {
  storyId: string;
  noOfComments: number;
}) => {
  const isOnHomePage = ["/", "/home", "/@/[author]", "/tag/[tag]"].includes(
    Router.pathname
  );
  const drawer = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="ccc"
        icon={<BiCommentAdd />}
        size="sm"
        variant="outline"
        colorScheme="blue"
        // colorScheme={isOnHomePage ? "gray" : "purple"}
        outline="none"
        border="none"
        _focus={{
          outline: "none",
          border: "none",
        }}
        onClick={drawer.onOpen}
      />

      {drawer.isOpen && (
        <Drawer
          isOpen={drawer.isOpen}
          onClose={drawer.onClose}
          storyId={storyId}
          noOfComments={noOfComments}
        />
      )}
    </>
  );
};

export default CommentDrawer;
