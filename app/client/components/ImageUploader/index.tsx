import { Box, Image } from "@chakra-ui/react";
import ImageActions from "./ImageActions";
const ImageUploader = (props: {
  imageUrl?: string;
  imageUploadCB: (src: string) => void;
  imageDeleteCB: (src?: string) => void;
}) => {
  return (
    <Box position="relative" border="0px" display="inline-block">
      <Image
        border="0px"
        mr="0"
        boxSize="150px"
        objectFit="cover"
        src={props.imageUrl}
        alt="storyTitleImage"
        fallbackSrc="https://via.placeholder.com/150?text=Title Image"
      />
      <ImageActions {...props} />
    </Box>
  );
};

export default ImageUploader;
