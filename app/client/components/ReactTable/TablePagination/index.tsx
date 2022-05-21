import {
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';
import {
  GrCaretNext,
  GrCaretPrevious,
  GrChapterNext,
  GrChapterPrevious,
} from 'react-icons/gr';
import { TableInstance } from 'react-table';

const TablePagination = ({
  tableInstance,
}: {
  tableInstance: any | TableInstance;
}) => {
  return (
    <HStack my={6} wrap="wrap">
      <HStack justifyContent="space-between" flex={[1, 1, 0.5]} mb={[4, 0]}>
        <Text whiteSpace="nowrap">Page Size</Text>
        <NumberInput
          step={5}
          min={1}
          size="md"
          maxW={24}
          defaultValue={tableInstance.state.pageSize}
          onChange={(valueString: any) => {
            tableInstance.setPageSize(
              valueString == 0 ? 1 : parseInt(valueString, 10)
            );
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <HStack justifyContent="space-around" flex={[1, 1, 0.5]} wrap="wrap">
        <Text whiteSpace="nowrap">
          Page {tableInstance.state.pageIndex + 1} of{' '}
          {tableInstance.pageOptions.length}{' '}
        </Text>
        <ButtonGroup variant="outline" spacing="2">
          <IconButton
            icon={<GrChapterPrevious />}
            aria-label="Page 0"
            size="sm"
            onClick={() => tableInstance.gotoPage(0)}
            disabled={!tableInstance.canPreviousPage}
          />
          <IconButton
            icon={<GrCaretPrevious />}
            aria-label="Page 2"
            size="sm"
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.canPreviousPage}
          />
          <IconButton
            icon={<GrCaretNext />}
            aria-label="Page 2"
            size="sm"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.canNextPage}
          />
          <IconButton
            icon={<GrChapterNext />}
            aria-label="Page last"
            size="sm"
            onClick={() => tableInstance.gotoPage(tableInstance.pageCount - 1)}
            disabled={!tableInstance.canNextPage}
          />
        </ButtonGroup>
      </HStack>
    </HStack>
  );
};

export default TablePagination;
