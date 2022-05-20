import { Heading, HStack, VStack } from '@chakra-ui/react';

import { TableInstance } from 'react-table';

const ShowColumns = ({
  tableInstance,
}: {
  tableInstance: TableInstance<any>;
}) => {
  return (
    <VStack wrap="wrap" my={4}>
      <Heading size="sm"> Show Columns </Heading>
      <HStack>
        {tableInstance.allColumns.map((column) => (
          <HStack key={column.id} mx={4}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />
              <br />
              {typeof column.Header == 'string' ? column.Header : column.id}
            </label>
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
};

export default ShowColumns;
