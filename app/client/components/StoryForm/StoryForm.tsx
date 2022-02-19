import { Box, Divider, SimpleGrid } from '@chakra-ui/react';

import MyInput from '../FormFields/Input';
import IsPublished from './IsPublished';
import QuillEditor from '../QuillEditor';
import Slug from './Slug';
import TagSelect from './Tags/TagSelect';
import AddTags from './Tags/AddTags';
import TitleImage from './TitleImage';

const StoryForm = () => {
  return (
    <Box border="2px" borderColor="white" p="8px" borderRadius="md">
      <IsPublished />
      <Divider my="4" />
      <SimpleGrid gap={2}>
        <SimpleGrid columns={[1, 2, 2]} gap={4}>
          <MyInput name="title" placeholder="Title" label="Title" size="sm" />
          <Slug />
          <TagSelect />
          <AddTags />
          <MyInput
            name="subtitle"
            placeholder="Subtitle"
            label="Subtitle"
            size="sm"
          />
          <TitleImage />
        </SimpleGrid>
        <MyInput
          name="keywords"
          placeholder="Keywords"
          label="Keywords"
          size="sm"
        />

        <QuillEditor />
      </SimpleGrid>
    </Box>
  );
};

export default StoryForm;
