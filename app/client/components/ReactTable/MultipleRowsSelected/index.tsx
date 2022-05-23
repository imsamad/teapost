import { Box, Collapse, Heading, HStack, Spacer } from '@chakra-ui/react';

import { TableInstance } from 'react-table';

const MultipleRowsSelected = ({
  tableInstance,
  render,
}: {
  tableInstance: any | TableInstance<any>;
  render: (
    selectRows: any,
    tableInstance: TableInstance<any>
  ) => React.ReactNode;
}) => {
  const selectRows = tableInstance.selectedFlatRows;

  return (
    <Box my={2}>
      <Collapse in={selectRows.length}>
        <HStack
          wrap="wrap"
          border="1px"
          borderColor="gray.300"
          p={2}
          borderRadius="md"
        >
          <Heading size="md">{selectRows.length} selected</Heading>
          <Spacer />
          {render(selectRows, tableInstance)}
        </HStack>
      </Collapse>
    </Box>
  );
};

export default MultipleRowsSelected;
