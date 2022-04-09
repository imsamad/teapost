import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import ImageGallery from "@compo/ImageGallery";
import { ChangeEvent, useState } from "react";
import { GrGallery } from "react-icons/gr";

import ImagePreviewModal from "../ImagePreviewModal";

const fo = { size: "sm", mt: 2, variant: "outline" };

const Index = ({
  imageUrl,
  imageUploadCB,
  imageDeleteCB,
}: {
  imageUrl?: string;
  imageUploadCB: (src: string) => void;
  imageDeleteCB: (src?: string) => void;
}) => {
  const [file, setFile] = useState<File>();
  const previewImageModal = useDisclosure();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
    previewImageModal.onOpen();
  };
  const isDeleting = useDisclosure();
  const handeDeleteImage = async () => {
    console.log("deleteing");
    isDeleting.onOpen();
    imageDeleteCB();
  };

  const imageGallery = useDisclosure();
  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        id="imageUpload"
        accept="image/*"
        multiple={false}
      />
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="edit"
            isRound
            icon={<EditIcon />}
            size="sm"
            border="1px"
            _focus={{ outline: "none" }}
            position="absolute"
            bottom="-6px"
            right="-20px"
            colorScheme="purple"
          />
        </PopoverTrigger>
        <PopoverContent maxW="100px" px={2} _focus={{ outline: "1px" }} pb={2}>
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
            <label htmlFor="imageUpload">{imageUrl ? "Edit" : "Upload"}</label>
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
