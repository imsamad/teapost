import { Box, Checkbox, Heading, HStack, VStack } from '@chakra-ui/react';

import { TableInstance } from 'react-table';

const ShowColumns = ({
  tableInstance,
}: {
  tableInstance: TableInstance<any>;
}) => {
  return (
    <VStack my={4} border="1px" borderColor="gray.400" p={2} borderRadius="md">
      <Heading size="sm"> Show Columns </Heading>
      <HStack wrap="wrap" justifyContent="center">
        {tableInstance.allColumns.map((column) => {
          return (
            <Box key={column.id} p={1}>
              <Checkbox
                isChecked={column.getToggleHiddenProps().checked}
                {...column.getToggleHiddenProps()}
              >
                {typeof column.Header == 'string' ? column.Header : column.id}
              </Checkbox>
            </Box>
          );
        })}
      </HStack>
    </VStack>
  );
};

export default ShowColumns;
