import { Button, Collapse, Container, useDisclosure } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import { TableInstance } from 'react-table';
import ShowColumns from '../ShowColumns';
import TablePagination from '../TablePagination';

const TableMeta = ({
  tableInstance,
}: {
  tableInstance: any | TableInstance;
}) => {
  const showMeta = useDisclosure();
  return (
    <Container maxW="container.lg">
      <TSButton colorScheme="linkedin" onClick={showMeta.onToggle}>
        {showMeta.isOpen ? 'Hide' : 'Show'} Table Meta
      </TSButton>
      <Collapse in={showMeta.isOpen}>
        <TablePagination tableInstance={tableInstance} />
        <ShowColumns tableInstance={tableInstance} />
      </Collapse>
    </Container>
  );
};

export default TableMeta;
