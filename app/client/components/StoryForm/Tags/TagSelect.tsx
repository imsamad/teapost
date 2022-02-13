import { Box, Heading, Text } from '@chakra-ui/react';
import { memo } from 'react';
import useSWR from 'swr';
import CheckBox from '../../FormFields/CheckBox';

const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/tags';
const TagSelect = () => {
  // console.log('name ', 'TagSelect');
  const { data } = useSWR(apiUrl);
  return (
    <Box>
      <Text size="sm" mb="4px">
        Select Tags
      </Text>
      <Box
        maxH="150px"
        overflowY="scroll"
        border="1px"
        borderRadius="md"
        p="10px"
        borderColor="gray.200"
      >
        {data ? (
          <CheckBox
            name="tags"
            data={data?.data}
            dataKeys={['_id', 'tag']}
            size="lg"
          />
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
};

export default memo(TagSelect);
