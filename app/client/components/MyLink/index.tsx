import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

type propTypes = {
  children: React.ReactNode | string;
  href: string;
  onHover?: string | 'umderline' | 'none';
  sx?: object;
};

const Index = ({ href, children, onHover, sx }: propTypes) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink _hover={{ textDecor: onHover ? onHover : 'none' }} {...sx}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Index;
