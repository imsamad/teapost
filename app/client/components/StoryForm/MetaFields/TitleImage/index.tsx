import { FormLabel, GridItem, Image } from "@chakra-ui/react";

import { useField } from "formik";

import ImageUploader from "@compo/ImageUploader";
import { submitStory } from "@lib/api/storyApi";
import { CustomError } from "@compo/FormFields";

const TitleImage = () => {
  const [{ value: titleImage }, { error, touched }, { setValue }] =
    useField("titleImage");
  const [{ value: isFromHistory }] = useField("isFromHistory");
  const [{ value: _id }] = useField("_id");

  return (
    <GridItem colSpan={2}>
      <FormLabel>Title Image</FormLabel>
      {isFromHistory ? (
        <Image
          mr="0"
          boxSize="150px"
          objectFit="cover"
          src={titleImage}
          alt="storyTitleImage"
          fallbackSrc="https://via.placeholder.com/150?text=Title Image"
        />
      ) : (
        <ImageUploader
          imageUrl={titleImage}
          imageUploadCB={async (src: string) => {
            await submitStory({
              values: { _id, titleImage: src },
              type: "image",
            });
            setValue(src);
          }}
          imageDeleteCB={async () => {
            submitStory({
              values: { _id, titleImage: "" },
              type: "image",
            }).finally(() => {
              setValue(undefined);
            });
          }}
        />
      )}
      <CustomError errors={error} isError={Boolean(error && touched)} />
    </GridItem>
  );
};

export default TitleImage;
