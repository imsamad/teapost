import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Link, Text } from '@chakra-ui/react';

import { typeOf } from '../../../lib/utils';

export type HeadMessageProps = {
  isError: boolean;
  message: any;
  redirectUrl?: string;
};

const Index = ({ headMsg }: { headMsg: HeadMessageProps }) => {
  return (
    <Box textAlign="center">
      {headMsg.redirectUrl ? (
        <Link target="_blank" href={headMsg.redirectUrl} color="blue.500">
          {headMsg.message} <ExternalLinkIcon mx="2px" />
        </Link>
      ) : typeOf(headMsg.message, 'array') ? (
        headMsg.message.map((msg: any) => {
          return (
            <Text
              key={msg}
              fontSize="xs"
              color={headMsg.isError ? 'red.500' : 'green.500'}
            >
              {msg}
            </Text>
          );
        })
      ) : (
        <Text fontSize="xs" color={headMsg.isError ? 'red.500' : 'green.500'}>
          {headMsg.message}
        </Text>
      )}
    </Box>
  );
};

export default Index;
