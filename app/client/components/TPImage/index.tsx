import { Image } from '@chakra-ui/react';
import { cloudinaryUrl, placeholderImage } from '@lib/utils';
const dummyImage = '/dummyImage.png';
const TPImage = ({
  src,
  width,
  height,
  alt,
}: {
  width: number | string;
  height: number | string;
  alt: string;
  src: string;
}) => {
  return (
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
  );
};

export default TPImage;
