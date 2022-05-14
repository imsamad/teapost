import { Image } from '@chakra-ui/react';
import React from 'react';

const FallbackImage = ({
  width = 400,
  height = 300,
  title,
  tryAgain,
}: {
  width?: number;
  height: number;
  title: string;
  tryAgain?: string;
}) => {
  return (
    <Image
      alt={title}
      width={width}
      height={height}
      src={tryAgain}
      fallback={
        <Image
          width={width}
          height={height}
          alt={title}
          src={`https://via.placeholder.com/${width}x${height}.png?text=${title}`}
        />
      }
    />
  );
};
export default FallbackImage;
