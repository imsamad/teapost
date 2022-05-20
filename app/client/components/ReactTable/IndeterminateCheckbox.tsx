/* eslint-disable react/display-name */
import React from 'react';

const RTCheckbox = React.forwardRef(({ indeterminate, ...rest }: any, ref) => {
  const defaultRef = React.useRef();
  const resolveRef: any = ref || defaultRef;
  React.useEffect(() => {
    resolveRef.current.indeterminate = indeterminate;
  }, [resolveRef, indeterminate]);
  return <input type="checkbox" ref={resolveRef} {...rest} />;
});

export default RTCheckbox;
