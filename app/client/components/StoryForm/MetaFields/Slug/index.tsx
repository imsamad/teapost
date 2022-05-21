import { RepeatIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { TPInput } from '@compo/FormFields';
import { slugify } from '@lib/utils';
import { useField } from 'formik';

import React from 'react';

const Index = () => {
  const [{ value: title }] = useField('title');
  const [, {}, { setValue }] = useField('slug');
  return (
    <HStack border="0px">
      <Box alignSelf="flex-end" flex="1">
        <TPInput name="slug" placeholder="Slug" label="Slug" />
      </Box>
      <IconButton
        alignSelf="flex-end"
        isDisabled={!Boolean(title)}
        icon={<RepeatIcon />}
        onClick={() => setValue(slugify(title))}
        aria-label="autoGenerateslugFromHeading"
        // size="sm"
      />
    </HStack>
  );
};

export default Index;
