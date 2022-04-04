import { Box } from "@chakra-ui/react";

import { TPInput } from "@compo/FormFields";
import { useField } from "formik";
import Tags from "../Tags";
import SaveButton from "./SaveButton";
import TitleImage from "./TitleImage";
import Slug from "./Slug";

const Index = () => {
  const [{ value: isFromHistory }] = useField("isFromHistory");
  return (
    <Box
      display={["block", "block", "grid"]}
      gridTemplateColumns="1fr 1f"
      gap={2}
    >
      <TitleImage />
      <TPInput name="title" placeholder="Title" label="Title" />
      <TPInput name="subtitle" placeholder="Subtitle" label="Subtitle" />
      <Slug />
      <TPInput name="keywords" placeholder="Keywords" label="Keywords" />

      <Tags />
      {!isFromHistory && <SaveButton />}
    </Box>
  );
};

export default Index;
