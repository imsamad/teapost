import { Flex, HStack, Switch, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { isAbleToPublished } from '../../../lib/Schema/storySchema';
import { validateYupSchema } from '../../../lib/utils';

const Index = () => {
  const { values, setFieldValue, setFieldTouched, setStatus, setErrors } =
    useFormikContext();

  // console.log('publsihed values ', values);
  // console.log('formikCtx ', formikCtx);
  const handleChange = async () => {
    // @ts-ignore
    validateYupSchema(isAbleToPublished, values)
      .then((res) => {
        // @ts-ignore
        setFieldValue('isPublished', !values.isPublished);
        setFieldTouched('isPublished', true);
      })
      .catch((err) => {
        setStatus(true);
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
          onChange={handleChange}
        />
      </Flex>
    </HStack>
  );
};

export default Index;
