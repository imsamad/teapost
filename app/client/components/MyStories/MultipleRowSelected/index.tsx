import {
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { TableInstance } from 'react-table';

const MultipleRowSelected = ({
  tableInstance,
}: {
  tableInstance: any | TableInstance<any>;
}) => {
  const storyIds = tableInstance.selectedFlatRows.map(
    (d: any) => d.original._id
  );

  return (
    <Box my={2}>
      <Collapse in={storyIds.length}>
        <HStack
          wrap="wrap"
          border="1px"
          borderColor="gray.300"
          p={2}
          borderRadius="md"
        >
          <Heading size="md">{storyIds.length} selected</Heading>
          <Spacer />
          <Button colorScheme="red">
            Delete {storyIds.length > 1 && 'All'}
          </Button>
          <Button colorScheme="green">
            Published {storyIds.length > 1 && 'All'}
          </Button>
        </HStack>
      </Collapse>
    </Box>
  );
};

export default MultipleRowSelected;
