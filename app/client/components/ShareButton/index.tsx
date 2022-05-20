import { IconButton } from '@chakra-ui/react';
import Router from 'next/router';
import { RiShareFill } from 'react-icons/ri';
import { RWebShare } from 'react-web-share';

const ShareButton = ({
  share,
  size,
}: {
  share: {
    title: string;
    text: string;
    url: string;
  };
  size?: string;
}) => {
  return (
    <RWebShare
      data={{
        ...share,
        url:
          typeof window !== 'undefined'
            ? window.location.origin + share.url
            : '',
      }}
      onClick={() => console.log('shared successfully!')}
    >
      <IconButton
        outline="none"
        border="none"
        _focus={{
          outline: 'none',
          border: 'none',
        }}
        icon={<RiShareFill />}
        aria-label="share"
        size={size || 'sm'}
        variant="outline"
        colorScheme="blue"
      />
    </RWebShare>
  );
};

export default ShareButton;
