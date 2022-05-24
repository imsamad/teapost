import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Collapse,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import TSIconButton from '@compo/UI/TSIconButton';
import { StoryCollectionType } from '@lib/types/StoryCollectionType';
import React from 'react';

const CollectionText = ({
  collection,
}: {
  collection: StoryCollectionType;
}) => {
  const show = useDisclosure();
  return (
    <Stack flex="1" p={1} pt={0} spacing={2}>
      <HStack
        justifyContent="space-between"
        onClick={() => {
          show.onToggle();
        }}
      >
        <Heading
          _hover={{
            cursor: 'pointer',
          }}
          size="md"
        >
          {collection.title}
        </Heading>

        <TSIconButton
          icon={show.isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          aria-label="show details"
          size="xs"
          variant="ghost"
        />
      </HStack>

      <Collapse in={show.isOpen}>
        <Text size="2xl" color="muted" fontStyle="italic">
          {collection?.description}
        </Text>
        <Text size="2xl" color="muted">
          Stories:- {collection?.stories.length}
        </Text>
      </Collapse>
    </Stack>
  );
};

export default CollectionText;
