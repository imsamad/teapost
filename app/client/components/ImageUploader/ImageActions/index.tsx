import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import ImageGallery from '@compo/ImageGallery';
import { ChangeEvent, useState } from 'react';
import { GrGallery } from 'react-icons/gr';

import ImagePreviewModal from '../ImagePreviewModal';

const fo = { size: 'sm', mt: 2, variant: 'outline' };

const Index = ({
  imageUrl,
  imageUploadCB,
  imageDeleteCB,
}: {
  imageUrl?: string;
  imageUploadCB: (src: string) => void;
  imageDeleteCB: (src?: string) => void;
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File>();
  const previewImageModal = useDisclosure();
  const oneMB = 1_048_576;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (parseInt(e.target.files?.[0].size, 10) > oneMB * 4) {
      toast({
        title: `Max image with size 4MB are allowed`,
        variant: 'error',
        isClosable: true,
        duration: 600,
      });
      return;
    }
    setFile(e.target.files?.[0]);
    previewImageModal.onOpen();
  };
  const isDeleting = useDisclosure();
  const handeDeleteImage = async () => {
    isDeleting.onOpen();
    imageDeleteCB();
  };

  const imageGallery = useDisclosure();
  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: 'none' }}
        id="imageUpload"
        accept="image/*"
        multiple={false}
      />
      <Popover computePositionOnMount>
        <PopoverTrigger>
          <IconButton
            aria-label="edit"
            isRound
            icon={<EditIcon />}
            size="sm"
            border="1px"
            _focus={{ outline: 'none' }}
            position="absolute"
            bottom="-6px"
            right="-20px"
            colorScheme="purple"
          />
        </PopoverTrigger>
        <PopoverContent maxW="100px" px={2} _focus={{ outline: '1px' }} pb={2}>
          <PopoverArrow />
          <Button
            leftIcon={
              <label htmlFor="imageUpload">
                {imageUrl ? <EditIcon /> : <PlusSquareIcon />}
              </label>
            }
            colorScheme="green"
            {...fo}
          >
            <label htmlFor="imageUpload">{imageUrl ? 'Edit' : 'Upload'}</label>
          </Button>

          {imageUrl && (
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="red"
              {...fo}
              onClick={handeDeleteImage}
            >
              Delete
            </Button>
          )}
          <Button
            leftIcon={<GrGallery color="purple" />}
            colorScheme="purple"
            {...fo}
            onClick={() => imageGallery.onOpen()}
          >
            Gallery
          </Button>
        </PopoverContent>
      </Popover>
      <ImageGallery
        onClickCb={imageUploadCB}
        isOpen={imageGallery.isOpen}
        onClose={imageGallery.onClose}
      />
      {file && (
        <ImagePreviewModal
          imageUploadCB={imageUploadCB}
          isOpen={previewImageModal.isOpen}
          onClose={() => {
            previewImageModal.onClose();
            setFile(undefined);
          }}
          file={file!}
        />
      )}
    </>
  );
};

export default Index;
