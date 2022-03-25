import { DeleteIcon } from "@chakra-ui/icons";
import { HStack, useDisclosure, useToast } from "@chakra-ui/react";
import TSButton from "@compo/UI/TSButton";
import { deleteStoryHistory } from "@lib/api/storyHistoryApi";
import instance from "@lib/axios";
import React from "react";

const HistoryAction = ({
  historyId,
  storyId,
  isAll = false,
  setInstances,
}: {
  historyId?: string;
  storyId: string;
  isAll?: boolean;
  setInstances: any;
}) => {
  const isLoading = useDisclosure();
  const toast = useToast();
  const handleDelete = () => {
    isLoading.onOpen();
    deleteStoryHistory({ historyId, storyId, isAll })
      .then(() => {
        setInstances((pre: any) =>
          isAll ? [] : pre.filter((instance: any) => instance._id != historyId)
        );
      })
      .catch(() => {
        toast({
          status: "warning",
          title: "Server busy please try again later",
          variant: "top-accent",
          isClosable: true,
        });
      })
      .finally(() => {
        isLoading.onClose();
      });
  };
  return (
    <HStack justifyContent="flex-end" my="1">
      <TSButton
        onClick={handleDelete}
        leftIcon={<DeleteIcon />}
        colorScheme="red"
        size="sm"
        loadingText="Deleting..."
        variant="outline"
        isLoading={isLoading.isOpen}
      >
        Delete {isAll && "All"}
      </TSButton>
    </HStack>
  );
};

export default HistoryAction;
