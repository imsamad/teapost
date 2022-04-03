import { Heading, HStack, Switch, useDisclosure } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { memo, useState } from "react";

import { isAbleToPublished } from "@lib/schema/story";
import { validateYupSchema } from "@lib/utils";
import { StoryFormType } from "@lib/types/StoryType";
import { publishedStory } from "@lib/api/storyApi";

const Index = () => {
  const { values } = useFormikContext();

  const [autoSave, setAutoSave] = useState();

  return (
    <HStack>
      <Heading size="sm">Auto Save</Heading>
      <Switch
        size="lg"
        isChecked={autoSave}
        value={autoSave ? 1 : 0}
        // onChange={handleChange}
      />
    </HStack>
  );
};

export default memo(Index);
