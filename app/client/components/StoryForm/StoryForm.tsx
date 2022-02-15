import { Button, Divider, SimpleGrid, Stack, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';

import MyInput from '../FormFields/Input';
import { submitStory } from '../../lib/createStory';
import Published from './Published';
import Quill from '../Quill';
import Slug from './Slug';
import TagSelect from './Tags';
import AddTags from './Tags/AddTags';

const StoryForm = ({ story }: any) => {
  useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
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
        console.log('formikProps ', formikProps);
        return (
          <Form>
            <Published />

            <Divider my="4" />
            <SimpleGrid gap={2}>
              <SimpleGrid columns={[1, 2, 2]} gap={4}>
                <MyInput
                  name="title"
                  placeholder="Title"
                  label="Title"
                  size="sm"
                />
                <Slug />
                <TagSelect />
                <Stack>
                  <MyInput
                    name="subtitle"
                    placeholder="Subtitle"
                    label="Subtitle"
                    size="sm"
                  />
                  <AddTags />
                </Stack>
              </SimpleGrid>
              <MyInput
                name="keywords"
                placeholder="Keywords"
                label="Keywords"
                size="sm"
              />

              <Quill />
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
            </SimpleGrid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StoryForm;
