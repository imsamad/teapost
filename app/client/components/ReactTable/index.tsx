/* eslint-disable react/jsx-key */
import {
  Container,
  Table,
  Tbody,
  Tr,
  Td,
  Tfoot,
  TableContainer,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';

import {
  Column,
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useRowSelect,
  TableInstance,
} from 'react-table';

import IndeterminateCheckbox from './IndeterminateCheckbox';
import TablePagination from './TablePagination';
import ShowColumns from './ShowColumns';
import TableHeader from './TableHeader';
import { DefaultColumnFilter } from './TableFilters';

const ReactTable = ({
  columns: unmemoCols,
  data: unMemoData,

  renderMultipleRowSelected,
}: {
  columns: Column[];
  data: any;
  renderMultipleRowSelected?: (
    tabeInstance: TableInstance<any>
  ) => React.ReactNode;
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => unmemoCols, []);
  const data = useMemo(() => {
    return unMemoData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const defaultColumn: any = useMemo(
    () => ({ Filter: DefaultColumnFilter }),
    []
  );
  const tableInstance = useTable(
    // @ts-ignore
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: columns.map((column: any) => {
          if (column.show === false) return column.accessor || column.id;
        }),
      },
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllPageRowsSelectedProps }: any) => {
              return (
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              );
            },
            Cell: ({ row }: any) => {
              return (
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              );
            },
          },
          ...columns,
        ];
      });
    }
  );

  return (
    <>
      <Container maxW="container.lg">
        <TablePagination tableInstance={tableInstance} />
        <ShowColumns tableInstance={tableInstance} />
        {renderMultipleRowSelected && renderMultipleRowSelected(tableInstance)}
      </Container>
      <TableContainer border="1px" borderColor="gray.300" borderRadius="md">
        <Table
          size="sm"
          {...tableInstance.getTableProps()}
          variant="striped"
          colorScheme="blue"
        >
          <TableHeader tableInstance={tableInstance} />
          <Tbody {...tableInstance.getTableBodyProps()}>
            {/* @ts-ignore */}
            {tableInstance.page.map((row: any) => {
              tableInstance.prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot>
            {tableInstance.footerGroups.map((footerGroup) => (
              <Tr {...footerGroup.getHeaderGroupProps()}>
                {footerGroup.headers.map((column) => (
                  <Td {...column.getHeaderProps()}>
                    {column?.render('Footer')}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default ReactTable;
