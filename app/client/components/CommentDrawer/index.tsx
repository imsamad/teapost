import TSIconButton from "@compo/UI/TSIconButton";
import { BiCommentAdd } from "react-icons/bi";
import Router from "next/router";
import Drawer from "./Drawer";
import { useDisclosure } from "@chakra-ui/react";
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
      <TSIconButton
        aria-label="comment"
        size={isOnHomePage ? "xs" : "sm"}
        variant={isOnHomePage ? "solid" : "outline"}
        colorScheme={isOnHomePage ? "gray" : "purple"}
        icon={<BiCommentAdd />}
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
