import { Box, Button, Heading, Icon } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import { GiQuill } from 'react-icons/gi';
import useUser from '../../lib/useUser';

import MyInput from '../FormFields/Input';
const StoryForm = () => {
  const { user } = useUser();
  return (
    <Box>
      <Heading textAlign="center" size="lg">
        <Icon as={GiQuill} />
        Write a story
      </Heading>
      <Formik
        initialValues={{
          title: '',
          slug: '',
          subtitle: '',
        }}
        onSubmit={() => {}}
      >
        {(formikProps) => {
          console.log('formikProps ', formikProps);
          return (
            <Form>
              <MyInput name="title" placeholder="Title" label="Title" />
              <MyInput name="slug" placeholder="Slug" label="Slug" />
              <MyInput
                name="subtitle"
                placeholder="Subtitle"
                label="Subtitle"
              />
              <MyInput
                name="keywords"
                placeholder="Keywords"
                label="Keywords"
              />
              <MyInput name="tags" placeholder="tags" label="Tags" />
              <MyInput name="body" placeholder="Body" label="Body" />
              <Button>Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default StoryForm;
