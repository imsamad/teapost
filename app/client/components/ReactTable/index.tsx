/* eslint-disable react/jsx-key */
import { Table, Tbody, Tr, Td, Tfoot, TableContainer } from '@chakra-ui/react';
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

import TableHeader from './TableHeader';
import { DefaultColumnFilter } from './TableFilters';
import TableMeta from './TableMeta';

const ReactTable = ({
  columns: unmemoCols,
  data: unMemoData,
  revalidator,
  renderMultipleRowSelected,
}: {
  columns: Column[];
  data: any;
  revalidator?: boolean;
  renderMultipleRowSelected?: (
    tabeInstance: TableInstance<any>
  ) => React.ReactNode;
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => unmemoCols, []);
  const data = useMemo(() => {
    return unMemoData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revalidator]);
  const defaultColumn: any = useMemo(
    () => ({ Filter: DefaultColumnFilter }),
    []
  );
  const tableInstance = useTable(
    {
      columns: unmemoCols,
      data: data,
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
      <TableMeta tableInstance={tableInstance} />
      {renderMultipleRowSelected && renderMultipleRowSelected(tableInstance)}

      <TableContainer
        border="1px"
        borderColor="gray.300"
        borderRadius="md"
        // @ts-ignore
        whiteSpace="wrap"
      >
        <Table size="sm" {...tableInstance.getTableProps()} variant="striped">
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
