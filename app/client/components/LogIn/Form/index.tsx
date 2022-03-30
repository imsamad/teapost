import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";

import { authSchema } from "@lib/schema/auth";
import { submitAuth, AuthType } from "@lib/api/authApi";
import { typeOf } from "@lib/utils";
import useUser from "@lib/useUser";

import FormBody from "./FormBody";
import Footer from "./Footer";
import Header from "./Header";
import LoginWrapper from "./LoginWrapper";
import FormStatus from "./FormStatus";

import { useAuthCtx } from "@compo/Context";

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
      const { user, redirectUrl, message, matchedIdentifiers, status } =
        await submitAuth(values);

      if (values.type == "logIn" && user) {
        setCookies(user);
        action.resetForm();
        if (login.isOpen) {
          login.onClose();
          toast({
            title: `Successfully logged in`,
            status: "success",
            isClosable: true,
            duration: 1000,
          });
        }
      }

      // if registering user , it will api payload send back {redirectUrl Or message}>
      else if (values.type == "register" || values.type == "forgotPassword") {
        if (redirectUrl || message) {
          // show status in header of form
          action.setStatus({
            status,
            redirectUrl,
            message,
          });
        }
      } else {
        action.setStatus({
          status,
          matchedIdentifiers,
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
        type: "register",
        fullName: "Abdus Samad",
        identifier: "",
        username: "imsamad",
        email: "imsamad@gmail.com",
        password: "Password@1206",
        confirmPassword: "Password@1206",
        identifierInitials: "",
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
