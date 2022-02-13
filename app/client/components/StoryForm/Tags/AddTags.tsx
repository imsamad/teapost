import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useRef } from 'react';
import { useState } from 'react';
import { boolean } from 'yup/lib/locale';
import { trimExtra } from '../../../lib/utils';

const AddTags = () => {
  const ref = useRef<HTMLInputElement>();
  const [isError, setIsError] = useState<boolean | string>(false);
  const [, meta, helpers] = useField('additionalTags');
  const handleClick = () => {
    // @ts-ignore
    const val: string = ref.current.value;
    if (val.length < 4 || !trimExtra(val, 4, ''))
      setIsError('Must be above 4 char');
    else {
      const newVal = meta.value ? [...meta.value, val] : [val];
      // @ts-ignore
      ref.current.value = '';
      helpers.setValue(newVal);
    }
  };
  return (
    <FormControl isInvalid={Boolean(isError)}>
      <FormLabel htmlFor="additionalTags">Add additional tags</FormLabel>
      <InputGroup>
        <Input
          size="sm"
          // @ts-ignore
          ref={ref}
          id="additionalTags"
          pr="4.5rem"
          onChange={() => {
            if (isError) setIsError(false);
          }}
        />
        <InputRightElement>
          <Button size="xs" onClick={handleClick}>
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{isError}</FormErrorMessage>
    </FormControl>
  );
};

export default AddTags;
