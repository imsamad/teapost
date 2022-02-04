import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Link, Text } from '@chakra-ui/react';

import { typeOf } from '../../../lib/utils';

export type HeadMessageProps = {
  error: boolean;
  message: any;
  url?: string;
};

const Index = ({ headMsg }: { headMsg: HeadMessageProps }) => {
  return (
    <Box textAlign="center">
      {headMsg.url ? (
        <Link target="_blank" href={headMsg.url} color="blue.500">
          {headMsg.message} <ExternalLinkIcon mx="2px" />
        </Link>
      ) : typeOf(headMsg.message, 'array') ? (
        headMsg.message.map((msg: any) => {
          console.log('msg ', msg);
          return (
            <Text
              key={msg}
              fontSize="xs"
              color={headMsg.error ? 'red.500' : 'green.500'}
            >
              {msg}
            </Text>
          );
        })
      ) : (
        <Text fontSize="xs" color={headMsg.error ? 'red.500' : 'green.500'}>
          {headMsg.message}
        </Text>
      )}
    </Box>
  );
};

export default Index;
