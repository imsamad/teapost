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
import { FaUserAlt as UserIcon } from 'react-icons/fa';
import { MdAlternateEmail as EmailIcon } from 'react-icons/md';
import Router, { useRouter } from 'next/router';

import { registerSchema, signInSchema } from '../../lib/Schema/signInForm';
import MyLink from '../MyLink';
import FormContainer from '../FormContainer';
import { signUp } from '../../lib/signUp';
import { typeOf } from '../../lib/utils';
import HeadMessage, { HeadMessageProps } from './HeadMessage';
import useUser from '../../lib/useUser';

import CustomInput from '../FormFields/Input';
import CustomPassword from '../FormFields/Password';

const Index = () => {
  const router = useRouter();

  const redirectTo = router.query.redirectTo
    ? (router.query.redirectTo as string)
    : '/me';

  const { setCookies } = useUser({
    redirectTo,
    redirectToIfLoggedIn: true,
  });

  const [registerForm, setRegisterForm] = useBoolean(false);
  const [headMsg, setHeadMsg] = useState<HeadMessageProps>();

  const handleSubmit = async (values: any, action: FormikHelpers<any>) => {
    setHeadMsg({ isError: false, message: '' });
    action.setSubmitting(true);
    try {
      const res = await signUp(values, registerForm);
      if (registerForm)
        setHeadMsg({
          isError: false,
          redirectUrl: res?.redirectUrl,
          message: res.message,
        });
      else {
        const user: any = res.data.user,
          refreshToken: any = res.data.refreshToken;

        setCookies(user, refreshToken);
      }
      action.setSubmitting(false);
      action.resetForm();
    } catch (errors: any) {
      if (typeOf(errors, 'string') || typeOf(errors, 'array')) {
        setHeadMsg({ isError: true, message: errors });
      } else {
        action.setErrors(errors);
      }
      action.setSubmitting(false);
    }
  };

  return (
    <FormContainer subtitle={registerForm ? 'Register' : 'Log In'}>
      {headMsg && <HeadMessage headMsg={headMsg} />}
      <Formik
        initialValues={{
          username: 'imsamad',
          email: 'imsamad00@gmail.com',
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
                <CustomInput
                  name="username"
                  placeholder="John Doe"
                  LeftAddOn={<UserIcon />}
                />
              )}
              <CustomInput
                name="email"
                placeholder="johndoe@email.com"
                LeftAddOn={<EmailIcon />}
                isRequired={true}
              />
              <CustomPassword name="password" />
              {registerForm && (
                <CustomPassword
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
