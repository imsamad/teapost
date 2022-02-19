import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';

import { submitStory } from '../../lib/createStory';
import StoryForm from './StoryForm';

const Index = ({ story }: any) => {
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      //   event.preventDefault();
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
        title: '',
        slug: '',
        subtitle: '',
        body: '',
        keywords: '',
        tags: [],
        additionalTags: [],
        titleImage:
          'https://res.cloudinary.com/demo/image/upload/w_150,h_100,c_fill/sample.jpg',
        isPublished: story.isPublished || false,
        ...story,
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        const data = await submitStory(values);
        actions.resetForm();
        actions.setValues(data);
        actions.setSubmitting(false);
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
