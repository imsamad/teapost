import { FormLabel, GridItem, Image } from "@chakra-ui/react";
import { CustomError } from "@compo/FormFields";
import { useField } from "formik";
import ImageActions from "./ImageActions";

const TitleImage = () => {
  const [{ value }, { error, touched }] = useField("titleImage");

  return (
    <GridItem colSpan={2}>
      <FormLabel>Title Image</FormLabel>
      <Image
        mr="0"
        boxSize="150px"
        objectFit="cover"
        src={value}
        alt="Dan Abramov"
        fallbackSrc="https://via.placeholder.com/150?text=Title Image"
      />
      <ImageActions />
      <CustomError errors={error} isError={Boolean(error && touched)} />
    </GridItem>
  );
};

export default TitleImage;
