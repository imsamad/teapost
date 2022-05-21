/* eslint-disable react/display-name */
import { Checkbox } from '@chakra-ui/react';
import React from 'react';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = React.useRef();
    const resolveRef: any = ref || defaultRef;
    React.useEffect(() => {
      resolveRef.current.indeterminate = indeterminate;
    }, [resolveRef, indeterminate]);

    return (
      <Checkbox isChecked={rest?.checked || false} ref={resolveRef} {...rest} />
    );
  }
);

export default IndeterminateCheckbox;
