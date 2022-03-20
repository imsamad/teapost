import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";

import { logInSchema } from "@lib/schema/auth";
import { signUp } from "@lib/api/authApi";
import { typeOf } from "@lib/utils";
import useUser from "@lib/useUser";

import FormBody from "./FormBody";
import Footer from "./Footer";
import Header from "./Header";
import LoginWrapper from "./LoginWrapper";
import FormStatus from "./FormStatus";

import { useAuthCtx } from "@compo/Context";

export type AuthType = {
  fullName: string;
  isRegister: boolean;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const Index = ({ redirectTo: redirectToProp }: { redirectTo?: string }) => {
  const router = useRouter();
  const toast = useToast();

  // Get redirectUrl if present
  const redirectTo = router.query.redirectTo
    ? (router.query.redirectTo as string)
    : redirectToProp ?? "/me";

  // Check if already login ,
  const { setCookies } = useUser({
    redirectTo,
    redirectToIfLoggedIn: true,
  });

  // login modal in case login form is on, & have to off after logged in.
  const { login } = useAuthCtx();

  const handleSubmit = async (
    values: AuthType,
    action: FormikHelpers<AuthType>
  ) => {
    action.setStatus(false);
    action.setSubmitting(true);

    try {
      const { user, redirectUrl, message, status }: any = await signUp(values);

      // if registering user , it will api payload send back {redirectUrl Or message}>
      if (redirectUrl || message) {
        // show status in header of form
        action.setStatus({
          status,
          redirectUrl,
          message,
        });
      } else if (user) {
        // set cookies
        setCookies(user);
        action.resetForm();
      }
      // If login modal is open i.e logging in via modal
      if (login.isOpen && !values.isRegister) {
        login.onClose();
        toast({
          title: `Successfully logged in`,
          status: "success",
          isClosable: true,
          duration: 1000,
        });
      }
      action.setSubmitting(false);
    } catch (error: any) {
      const { message, status } = error;

      if (typeOf(error, "string") || typeOf(error, "array")) {
        action.setStatus({
          status: status || "error",
          message: message || error || "Invalid data",
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
        fullName: "Abdus Samad",
        isRegister: false,
        username: "imsamad",
        email: "imsamad00@gmail.com",
        password: "Password@1206",
        passwordConfirmation: "Password@1206",
      }}
      validationSchema={logInSchema}
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
                {formikProps.values.isRegister ? "Register" : "Log In"}
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
