import { AspectRatio, Box, Image } from '@chakra-ui/react';
import { cloudinaryUrl, placeholderImage } from '@lib/utils';
const dummyImage = '/dummyImage.png';
const TPImage = ({
  src,
  width,
  height,
  alt,
  maxW = '400px',
  aspectRatio = 4 / 3,
}: {
  width: number | string;
  height: number | string;
  alt: string;
  src: string;
  maxW?: string | number;
  aspectRatio?: number;
}) => {
  return (
    <Box w="full">
      <AspectRatio maxW={maxW} ratio={aspectRatio} mx="auto">
        <Image
          src={
            !src
              ? dummyImage
              : cloudinaryUrl({
                  src,
                  // @ts-ignore
                  height: parseInt(height, 10),
                  // @ts-ignore
                  width: parseInt(width, 10),
                })
          }
          width={width}
          alt={alt}
          height={height}
          fallback={
            <Image
              src={src}
              width={width}
              alt={alt}
              height={height}
              fallbackSrc={placeholderImage(width, height)}
            />
          }
        />
      </AspectRatio>
    </Box>
  );
};

export default TPImage;
