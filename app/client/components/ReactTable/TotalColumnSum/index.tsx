import { useMemo } from 'react';
import { CellProps } from 'react-table';

export const TotalColumnSum = (key: string) => (info: CellProps<any>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const total = useMemo(
    () => info.rows.reduce((sum, row) => row.values[key] + sum, 0),
    [info.rows]
  );
  return total;
};
