import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import TSIconButton from "@compo/UI/TSIconButton";
import { useState } from "react";

import NewCollection from "@compo/NewCollection";
import RemoveBtn from ".././RemoveBtn";

const Index = ({
  collectionId,
  title,
  description,
  onRemoveCB,
}: {
  collectionId: string;
  title: string;
  description: string;
  onRemoveCB: () => void;
}) => {
  const [collection, setCollection] = useState({ title, description });
  const editColl = useDisclosure();
  return (
    <>
      {editColl.isOpen ? (
        <NewCollection
          editObj={{
            preValues: collection,
            isEdit: true,
            collectionId: collectionId,
            editCB: (title: string, description: string) => {
              setCollection((pre) => ({ ...pre, title, description }));
              editColl.onClose();
            },
          }}
          onCancel={editColl.onClose}
        />
      ) : (
        <>
          <HStack>
            <Box>
              <Heading size="md"> {collection.title}</Heading>{" "}
              <Text size="2xl" color="muted">
                {collection?.description}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <RemoveBtn
                collectionId={collectionId}
                removeCB={() => onRemoveCB()}
              />
              <TSIconButton
                my={2}
                isRound
                onClick={editColl.onOpen}
                size="xs"
                variant="outline"
                icon={<EditIcon />}
                aria-label="edit"
                colorScheme="green"
              />
            </Box>
          </HStack>
        </>
      )}
    </>
  );
};

export default Index;
