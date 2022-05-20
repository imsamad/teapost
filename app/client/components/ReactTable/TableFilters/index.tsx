import { Input, Text, VStack } from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';

export const DefaultColumnFilter = ({ column }: any) => {
  const { filterValue, setFilter, preFilteredRows } = column;
  const [value, setValue] = useState(filterValue || '');
  const debounce = (func: Function) => {
    let timer: any;
    return function (...args: any) {
      // @ts-ignore
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange = useCallback(
    debounce((initValue: any) => {
      setFilter(initValue || undefined);
    }),
    []
  );
  const count = preFilteredRows.length;
  return (
    <span>
      <Input
        value={value}
        // value={filterValue}
        placeholder={`Search ${count} records`}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
};

export function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row: any) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <VStack>
      <Text>{filterValue}</Text>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </VStack>
  );
}
