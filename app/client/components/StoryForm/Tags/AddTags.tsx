import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { useRef } from 'react';
import { useState } from 'react';
import { boolean } from 'yup/lib/locale';
import { trimExtra } from '../../../lib/utils';

const AddTags = () => {
  const ref = useRef<HTMLInputElement>();
  const [isError, setIsError] = useState<boolean | string>(false);
  const [fieldProps, meta, helpers] = useField('additionalTags');

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

  const removeTag = (index: number) => () => {
    let tempTags = fieldProps.value;
    tempTags.splice(index, 1);
    helpers.setValue(tempTags);
  };
  return (
    <Box>
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

      {fieldProps?.value && fieldProps?.value.length ? (
        <>
          <Text my="4px" fontSize="sm">
            You added
          </Text>
          {fieldProps.value.map((tag: string, index: number) => {
            return (
              <Tag
                m="1px"
                size="sm"
                key={tag}
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton onClick={removeTag(index)} />
              </Tag>
            );
          })}
        </>
      ) : null}
    </Box>
  );
};

export default AddTags;
