import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Switch,
} from '@chakra-ui/react';
import { Field, Form, Formik, FieldProps } from 'formik';

const Index = () => {
  return (
    <Formik
      initialValues={{
        isPublished: false,
      }}
      onSubmit={(values) => {
        console.log('Values ', values);
      }}
      validate={(v) => {
        if (!v?.isPublished) return { isPublished: 'It is required' };
      }}
    >
      <Form>
        <Field name="isPublished" type="radio">
          {({ field, meta }: FieldProps) => {
            const isError = Boolean(meta.error && meta.touched);
            return (
              <FormControl isInvalid={isError}>
                <FormLabel>Published</FormLabel>
                <Switch colorScheme="" size="md" {...field} />;
                <FormErrorMessage>{meta.error}</FormErrorMessage>
              </FormControl>
            );
          }}
        </Field>
      </Form>
    </Formik>
  );
};

export default Index;
