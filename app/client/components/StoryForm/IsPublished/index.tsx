import { Flex, HStack, Switch, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { isAbleToPublished } from '../../../lib/Schema/storySchema';
import { validateYupSchema } from '../../../lib/utils';

// @ts-ignore
import axios from '#axios';
const Index = () => {
  const { values, setFieldValue, setFieldTouched, setErrors } =
    useFormikContext();

  const sendRequestAndChangeValues = async () => {
    const {
      data, // @ts-ignore
    } = await axios.put(`/story/published/${values.id}`, {
      // @ts-ignore
      isPublished: !values.isPublished,
    });

    setFieldValue('isPublished', data.data.isPublished);
    setFieldTouched('isPublished', true);
  };
  const handleChange = async () => {
    // @ts-ignore
    // console.log('values inside', values.isPublished);
    if (values.isPublished == true) {
      await sendRequestAndChangeValues();
    }
    // @ts-ignore
    else
      validateYupSchema(isAbleToPublished, values)
        .then(async (res) => {
          await sendRequestAndChangeValues();
        })
        .catch((err) => {
          // setStatus(true);
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
        <Switch // @ts-ignore
          isChecked={values?.isPublished}
          // @ts-ignore
          value={values?.isPublished}
          onChange={handleChange}
        />
      </Flex>
    </HStack>
  );
};

export default Index;
