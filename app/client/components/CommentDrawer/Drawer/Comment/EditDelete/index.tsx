import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Fade,
  useDisclosure,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import TSIconButton from '@compo/UI/TSIconButton';
import React, { useRef } from 'react';
import { GrMoreVertical } from 'react-icons/gr';
import { useCTX } from '../../AddedCtx';

const Index = ({
  openEdit,
  onDelete,
}: {
  openEdit: () => void;
  onDelete: () => Promise<void>;
}) => {
  const actions = useDisclosure();
  const ref = useRef<any>();

  useOutsideClick({
    ref: ref,
    handler: () => actions.onClose(),
  });
  const { setNoOfReplies } = useCTX();
  return (
    <Box>
      <Box position="relative">
        <TSIconButton
          icon={actions.isOpen ? <CloseIcon /> : <GrMoreVertical />}
          aria-label="more"
          isRound
          border="0"
          outline="none"
          variant="outline"
          size="xs"
          onClick={() => actions.onToggle()}
        />
        <Fade in={actions.isOpen} ref={ref}>
          <VStack
            zIndex="tooltip"
            bgColor="white"
            position="absolute"
            right="0"
            top="25px"
            borderColor="gray.200"
            border="1px"
            shadow="md"
            borderRadius="md"
            p="1"
            px="0.5px"
          >
            <TSIconButton
              size="xs"
              variant="solid"
              icon={<DeleteIcon />}
              aria-label="Delete"
              colorScheme="red"
              mx="2"
              onClick={(e) => {
                onDelete().then(() => {
                  setNoOfReplies(-1);
                  actions.onClose();
                });
              }}
            />
            <TSIconButton
              size="xs"
              variant="outline"
              colorScheme="green"
              icon={<EditIcon />}
              aria-label="Edit"
              onClick={() => {
                openEdit();
                actions.onClose();
              }}
            />
          </VStack>
        </Fade>
      </Box>
    </Box>
  );
};

export default Index;
