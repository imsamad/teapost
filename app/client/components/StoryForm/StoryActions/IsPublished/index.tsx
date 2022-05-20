import { Heading, HStack, Switch } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { memo } from 'react';

import { isAbleToPublished } from '@lib/schema/story';
import { validateYupSchema } from '@lib/utils';
import { StoryFormType } from '@lib/types/StoryType';
import { publishedStoryApi } from '@lib/api/storyApi';

const Index = () => {
  const { values, setFieldValue, setFieldTouched, setErrors } =
    useFormikContext<StoryFormType>();

  const handleChange = async () => {
    if (values.isPublished == true) {
      const data = await publishedStoryApi({
        isPublished: false,
        storyId: values._id,
      });
      setFieldValue('isPublished', data.story.isPublished);
      setFieldTouched('isPublished', true);
    } else
      validateYupSchema(isAbleToPublished, values)
        .then(async (res) => {
          const data = await publishedStoryApi({
            isPublished: true,
            storyId: values._id,
          });
          setFieldValue('isPublished', data.story.isPublished);
          setFieldTouched('isPublished', true);
        })
        .catch((err) => {
          let error = err?.message || err;
          // setStatus(true);
          Object.keys(err).forEach((key: any) => {
            setFieldTouched(key, true, false);
          });
          setErrors(err);
        });
  };
  return (
    <HStack>
      <Heading size="sm">Published</Heading>
      <Switch
        colorScheme="cyan"
        size="lg"
        isChecked={values?.isPublished}
        value={values?.isPublished ? 1 : 0}
        onChange={handleChange}
      />
    </HStack>
  );
};

export default memo(Index);
