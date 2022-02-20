import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';

import { submitStory } from '../../lib/createStory';
import StoryForm from './StoryForm';
const initValues = {
  title: '',
  slug: '',
  subtitle: '',
  body: '',
  keywords: '',
  tags: [],
  additionalTags: [],
  titleImage: '',
  isPublished: false,
};

const Index = ({ story }: any) => {
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };
    // window.addEventListener('beforeunload', unloadCallback);
    // return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);
  const toast = useToast();
  const saveToast = (title: string, position?: any) =>
    toast({
      title,
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: position || 'bottom',
    });
  return (
    <Formik
      initialValues={{
        ...initValues,
        ...story,
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        const data = await submitStory(values);
        actions.setSubmitting(false);

        actions.setValues({
          ...initValues,
          ...data,
        });

        saveToast('Saved Changes.');
      }}
    >
      {(formikProps: any) => {
        return (
          <Form>
            <StoryForm />
            <Button
              variant="solid"
              colorScheme="blue"
              disabled={!formikProps.dirty}
              isLoading={formikProps.isSubmitting}
              loadingText="Submitting"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
export default Index;
