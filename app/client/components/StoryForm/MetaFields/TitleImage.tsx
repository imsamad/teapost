import { GridItem, Image } from "@chakra-ui/react";
import { useField } from "formik";

const TitleImage = () => {
  const [{ value }] = useField("titleImage");

  return (
    <GridItem colSpan={2}>
      <Image
        mr="0"
        boxSize="150px"
        objectFit="cover"
        src={value}
        alt="Dan Abramov"
        fallbackSrc="https://via.placeholder.com/150"
      />
    </GridItem>
  );
};

export default TitleImage;
