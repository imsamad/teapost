import { Box, Text } from '@chakra-ui/react';

import { memo } from 'react';
import useSWR from 'swr';
import CheckBox from '../../FormFields/CheckBox';

const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/tags';
const TagSelect = () => {
  const { data } = useSWR(apiUrl);

  return (
    <Box>
      <Text size="sm" mb="4px">
        Select Tags
      </Text>
      <Box
        maxH="150px"
        overflowY="auto"
        border="1px"
        borderRadius="md"
        p="5px"
        borderColor="gray.200"
      >
        {!data ? (
          <>Loading tags...</>
        ) : data.data.length ? (
          <CheckBox
            name="tags"
            data={data?.data}
            dataKeys={['_id', 'tag']}
            size="lg"
          />
        ) : (
          <>No tags available </>
        )}
      </Box>
    </Box>
  );
};

export default memo(TagSelect);
