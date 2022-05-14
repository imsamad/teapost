import { Text } from '@chakra-ui/react';
import { CombineComment } from '@lib/types/CommentTypes';
import { timeSince } from '@lib/utils';
import React from 'react';

const CommentMeta = ({
  username,
  updatedAt,
  createdAt,
}: {
  username: CombineComment['user']['username'];
  updatedAt: CombineComment['updatedAt'];
  createdAt: CombineComment['updatedAt'];
}) => {
  const getSeconds = (val: Date) => new Date(val).getSeconds();

  return (
    <>
      <Text
        pt="0"
        mt="0"
        lineHeight={1.5}
        fontSize="sm"
        color="rgb(3,3,3)"
        _dark={{
          color: '#ddd',
        }}
        _hover={{
          cursor: 'pointer',
        }}
        fontWeight={700}
      >
        {username}
      </Text>
      <Text fontStyle="italic" fontSize="xs" color="muted">
        {timeSince(updatedAt)} ago
        {getSeconds(updatedAt) != getSeconds(createdAt) ? '  (edited)' : ''}
      </Text>
    </>
  );
};

export default CommentMeta;
