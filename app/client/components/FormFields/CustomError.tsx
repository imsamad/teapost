import { Box, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { typeOf } from '../../lib/utils';

const Error = ({
  errors,
  isError,
}: {
  isError: boolean;
  errors: string | string[];
}) => {
  return (
    <Box color="red.600">
      {isError && typeOf(errors, 'array') ? (
        // @ts-ignore
        [...new Set(errors)].map((err: string) => (
          <Text fontSize="md" key={err || nanoid(10)} color="red.500">
            {err}
          </Text>
        ))
      ) : isError ? (
        <Text fontSize="md">{errors}</Text>
      ) : null}
    </Box>
  );
};

export default Error;
