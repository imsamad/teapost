import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { ButtonGroup, HStack, useDisclosure } from "@chakra-ui/react";
import { useField } from "formik";
import { GrGallery } from "react-icons/gr";
import TSButton from "@compo/UI/TSButton";
import { ChangeEvent, useState } from "react";
import { submitStory } from "@lib/api/storyApi";
import ImageModal from "./ImageModal";
import ImageGallery from "@compo/ImageGallery";

const ImageActions = () => {
  const [file, setFile] = useState<File>(),
    imageModal = useDisclosure();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
    imageModal.onOpen();
  };

  const [{ value: titleImage }, {}, { setValue }] = useField("titleImage"),
    [{ value: _id }] = useField("_id");
  const handleStoryTitleImage = async (titleImage: string) => {
    await submitStory({ values: { _id, titleImage }, type: "image" });
    setValue(titleImage);
  };

  const isDeleting = useDisclosure();
  const handeDeleteTitleImage = async () => {
    isDeleting.onOpen();
    submitStory({ values: { _id, titleImage: "" }, type: "image" }).finally(
      () => {
        isDeleting.onClose();
        setValue(undefined);
      }
    );
  };
  const imageGallery = useDisclosure();
  return (
    <>
      <HStack my="1">
        <input
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
          id="imageUpload"
          accept="image/*"
          multiple={false}
        />
        <TSButton
          colorScheme="blue"
          leftIcon={
            <label htmlFor="imageUpload">
              {titleImage ? <EditIcon /> : <PlusSquareIcon />}
            </label>
          }
          size="xs"
        >
          <label htmlFor="imageUpload">{titleImage ? "Edit" : "Upload"}</label>
        </TSButton>

        {titleImage && (
          <TSButton
            leftIcon={<DeleteIcon />}
            size="xs"
            colorScheme="red"
            isLoading={isDeleting.isOpen}
            loadingText="Deleting..."
            onClick={handeDeleteTitleImage}
          >
            Delete
          </TSButton>
        )}
        <TSButton
          leftIcon={<GrGallery />}
          size="xs"
          onClick={imageGallery.onOpen}
        >
          From Gallery
        </TSButton>
        <ImageGallery
          onClickCb={(src) => handleStoryTitleImage(src)}
          isOpen={imageGallery.isOpen}
          onClose={imageGallery.onClose}
        />
      </HStack>
      {file && (
        <ImageModal
          handleStoryTitleImage={handleStoryTitleImage}
          isOpen={imageModal.isOpen}
          onClose={() => {
            imageModal.onClose();
            setFile(undefined);
          }}
          file={file!}
        />
      )}
    </>
  );
};

export default ImageActions;
