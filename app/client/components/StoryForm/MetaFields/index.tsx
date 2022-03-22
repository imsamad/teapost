import { Box } from "@chakra-ui/react";

import { TPInput } from "@compo/FormFields";
import Tags from "../Tags";
import SaveButton from "./SaveButton";

const Index = () => {
  return (
    <Box
      display={["block", "block", "grid"]}
      gridTemplateColumns="1fr 1f"
      gap={2}
    >
      <TPInput name="title" placeholder="Title" label="Title" />
      <TPInput name="subtitle" placeholder="Subtitle" label="Subtitle" />
      <TPInput name="slug" placeholder="Slug" label="Slug" />
      <TPInput name="keywords" placeholder="Keywords" label="Keywords" />

      <Tags />
      <SaveButton />
    </Box>
  );
};

export default Index;
