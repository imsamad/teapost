import { useState } from 'react';
import {
  Button,
  Flex,
  Link,
  Spacer,
  Stack,
  useBoolean,
} from '@chakra-ui/react';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { FaUserAlt as UserNameIcon } from 'react-icons/fa';
import { MdAlternateEmail as EmailIcon } from 'react-icons/md';

import { registerSchema, signInSchema } from '../../lib/Schema/signInForm';
import { PasswordField, Input } from './CustomInput';
import MyLink from '../MyLink';
import FormContainer from '../FormContainer';
import { signUp } from '../../lib/signUp';
import { typeOf } from '../../lib/utils';
import HeadMessage, { HeadMessageProps } from './HeadMessage';

const Index = () => {
  const [registerForm, setRegisterForm] = useBoolean();
  const [headMsg, setHeadMsg] = useState<HeadMessageProps>();

  const handleSubmit = async (values: any, action: FormikHelpers<any>) => {
    // Callback to show result...
    const setMessages = ({ error, message, url }: HeadMessageProps) => {
      /**
       * 1.a) Value was invalid put setHeadMsg={ error: true ,message:@string }
       * 1.b) Value is valid & account cretated =>
       * then setHeadMsg={ error: false , message:@string, url:HttpUrl }
       * 2.) In case of signIn if any field was incorret setFieldError individually
       */

      if (typeOf(message, 'string') || typeOf(message, 'array')) {
        setHeadMsg({ error, message, url });
      } else
        Object.keys(message).forEach((field) => {
          action.setFieldError(field, message[field]);
        });
    };

    action.setSubmitting(true);
    if (registerForm) await signUp(values, setMessages);
    action.setSubmitting(false);
  };

  return (
    <FormContainer subtitle={registerForm ? 'Register' : 'Log In'}>
      {headMsg && <HeadMessage headMsg={headMsg} />}
      <Formik
        initialValues={{
          username: 'imsamad',
          email: 'imsamad1@gmail.com',
          password: 'Password@1206',
          passwordConfirmation: 'Password@1206',
        }}
        validationSchema={registerForm ? registerSchema : signInSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <Stack spacing={4}>
              {registerForm && (
                <Input
                  name="username"
                  placeholder="Username"
                  Icon={EmailIcon}
                />
              )}
              <Input name="email" placeholder="Email" Icon={UserNameIcon} />
              <PasswordField name="password" placeholder="Password" />
              {registerForm && (
                <PasswordField
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                />
              )}
              <ExtraStrip
                registerForm={registerForm}
                toggle={setRegisterForm.toggle}
              />
              <Button
                isLoading={props.isSubmitting}
                type="submit"
                colorScheme="blue"
                size="sm"
              >
                {registerForm ? 'Register' : 'Log In'}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default Index;

const ExtraStrip = ({
  registerForm,
  toggle,
}: {
  registerForm: boolean;
  toggle: any;
}) => (
  <Flex
    alignItems="center"
    sx={{
      fontSize: '12px',
      color: 'blue',
      textDecoration: 'underline',
    }}
  >
    {registerForm ? (
      <Link as="button" type="button" onClick={toggle}>
        Log In
      </Link>
    ) : (
      <Link as="button" type="button" onClick={toggle}>
        Register
      </Link>
    )}
    <Spacer />
    <MyLink href="/auth/register" onHover="underline">
      Forgot Password
    </MyLink>
  </Flex>
);
