import { Button, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useRouter } from 'next/router';

import { authSchema } from '@lib/schema/auth';
import { submitAuth, AuthType } from '@lib/api/authApi';
import { typeOf } from '@lib/utils';

import FormBody from './FormBody';
import Footer from './Footer';
import Header from './Header';
import LoginWrapper from './LoginWrapper';
import FormStatus from './FormStatus';

import { useAuthCtx } from '@compo/Context';

const Index = ({ redirectTo: redirectToProp }: { redirectTo?: string }) => {
  const router = useRouter();
  const toast = useToast();

  const { setAuth } = useAuthCtx();
  // Get redirectUrl if present
  const redirectTo = (router.query.redirectTo as string) || redirectToProp;

  const handleSubmit = async (
    values: AuthType,
    action: FormikHelpers<AuthType>
  ) => {
    action.setStatus(false);
    action.setSubmitting(true);
    try {
      const {
        // if values.type== [login]
        user,
        accessToken,

        // if values.type== [register OR forgotPassword]
        redirectUrl,
        message,

        // if values.type==forgotIdentifiers
        matchedIdentifiers,

        status,
      } = await submitAuth(values);

      if (values.type == 'logIn' && user) {
        setAuth({ user, accessToken }, redirectTo);
        action.resetForm();

        toast({
          title: `Successfully logged in`,
          status: 'success',
          isClosable: true,
          duration: 1000,
        });
      } else if (values.type == 'register' || values.type == 'forgotPassword') {
        if (redirectUrl || message) {
          // show status in header of form
          action.setStatus({
            status,
            redirectUrl,
            message,
          });
        }
      } else if (values.type == 'forgotIdentifier') {
        action.setStatus({
          status,
          matchedIdentifiers,
        });
      }

      action.setSubmitting(false);
    } catch (error: any) {
      const { message, status } = error;
      if (typeOf(error, 'string') || typeOf(error, 'array')) {
        action.setStatus({
          status: status || 'error',
          message: message || error || 'Invalid data',
        });
      } else {
        action.setErrors(message);
      }
      action.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        type: 'logIn',
        fullName: 'Abdus Samad',
        identifier: 'imsamad',
        username: 'imsamad',
        email: 'imsamad@gmail.com',
        password: 'Password@1206',
        confirmPassword: 'Password@1206',
        identifierInitials: '',
      }}
      validationSchema={authSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<AuthType>) => {
        return (
          <Form>
            <LoginWrapper>
              <Header />
              <FormStatus />
              <FormBody />
              <Button
                isLoading={formikProps.isSubmitting}
                type="submit"
                colorScheme="blue"
                size="sm"
              >
                Submit
              </Button>
              <Footer />
            </LoginWrapper>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Index;
