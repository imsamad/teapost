import { Divider, SimpleGrid } from "@chakra-ui/react";

import dynamic from "next/dynamic";
import { TPInput } from "../FormFields";
import IsPublished from "./IsPublished";
import Slug from "./Slug";
import TagSelect from "./Tags/TagSelect";
import AddTags from "./Tags/AddTags";
import TitleImage from "./TitleImage";
const QuillEditor = dynamic(() => import("./QuillEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const StoryForm = () => {
  return (
    <>
      <IsPublished />
      <Divider my="4" />
      <SimpleGrid gap={2}>
        <SimpleGrid columns={[1, 2, 2]} gap={4}>
          <TPInput name="title" placeholder="Title" label="Title" size="sm" />
          {/* <TPInput name="slug" placeholder="Slug" label="Slug" size="sm" /> */}
          <Slug />
          <TagSelect />
          <AddTags />
          <TPInput
            name="subtitle"
            placeholder="Subtitle"
            label="Subtitle"
            size="sm"
          />
          <TitleImage />
        </SimpleGrid>
        <TPInput
          name="keywords"
          placeholder="Keywords"
          label="Keywords"
          size="sm"
        />

        {/* <QuillEditor /> */}
      </SimpleGrid>
    </>
  );
};

export default StoryForm;
