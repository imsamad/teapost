import { Flex, HStack, Switch, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { memo } from "react";

import { isAbleToPublished } from "@lib/schema/story";
import { validateYupSchema } from "@lib/utils";
import { StoryFormType } from "@lib/types/StoryType";
import { publishedStory } from "@lib/api/storyApi";

const Index = () => {
  const { values, setFieldValue, setFieldTouched, setErrors } =
    useFormikContext<StoryFormType>();

  const handleChange = async () => {
    if (values.isPublished == true) {
      await publishedStory({ isPublished: false, storyId: values._id });
    } else
      validateYupSchema(isAbleToPublished, values)
        .then(async (res) => {
          const data = await publishedStory({
            isPublished: true,
            storyId: values._id,
          });
          setFieldValue("isPublished", data.story.isPublished);
          setFieldTouched("isPublished", true);
        })
        .catch((err) => {
          // setStatus(true);
          console.log("err ", err);
          Object.keys(err).forEach((key: any) => {
            setFieldTouched(key, true, false);
          });
          setErrors(err);
        });
  };
  return (
    <HStack justifyContent="flex-end" my="4">
      <Flex justifyContent="center" alignItems="center">
        <Text size="md" mx="4">
          Published
        </Text>
        <Switch
          isChecked={values?.isPublished}
          value={values?.isPublished ? 1 : 0}
          onChange={handleChange}
        />
      </Flex>
    </HStack>
  );
};

export default memo(Index);
