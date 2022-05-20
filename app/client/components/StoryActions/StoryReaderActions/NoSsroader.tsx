import { ButtonGroup, IconButton } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import React from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BiCommentAdd } from 'react-icons/bi';
import { RiShareFill } from 'react-icons/ri';

const NoSsroader = () => {
  return (
    <ButtonGroup alignItems="center">
      <TSButton
        leftIcon={<AiFillLike />}
        size="xs"
        variant="outline"
        colorScheme="blue"
        outline="none"
        border="none"
        _focus={{
          outline: 'none',
          border: 'none',
        }}
      >
        4
      </TSButton>
      <TSButton
        leftIcon={<AiFillDislike />}
        size="xs"
        variant="outline"
        colorScheme="blue"
        outline="none"
        border="none"
        _focus={{
          outline: 'none',
          border: 'none',
        }}
      >
        5
      </TSButton>
      <TSButton
        variant="ghost"
        colorScheme="blue"
        leftIcon={<BiCommentAdd />}
        size="xs"
        _focus={{ outline: 'none' }}
      >
        8
      </TSButton>
      <IconButton
        outline="none"
        border="none"
        _focus={{
          outline: 'none',
          border: 'none',
        }}
        icon={<RiShareFill />}
        aria-label="share"
        size={'sm'}
        variant="outline"
        colorScheme="blue"
      />
    </ButtonGroup>
  );
};

export default NoSsroader;
