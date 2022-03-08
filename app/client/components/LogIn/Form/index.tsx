import { Button, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRouter } from "next/router";

import { logInSchema } from "../../../lib/Schema/signInForm";
import { signUp } from "../../../lib/signUp";
import { typeOf } from "../../../lib/utils";
import useUser from "../../../lib/useUser";

import FormFields from "./FormFields";
import Footer from "./Footer";
import Header from "./Header";
import LoginWrapper from "./LoginWrapper";
import FormStatus from "./FormStatus";
import useUICtx from "../../Context/useUICtx";
import { useSWRConfig } from "swr";

const Index = ({ redirectTo: redirectToProp }: { redirectTo?: string }) => {
  const router = useRouter();
  const toast = useToast();
  const { login } = useUICtx();
  const redirectTo = router.query.redirectTo
    ? (router.query.redirectTo as string)
    : redirectToProp ?? "/me";

  const { setCookies } = useUser({
    redirectTo,
    redirectToIfLoggedIn: true,
  });

  const handleSubmit = async (values: any, action: FormikHelpers<any>) => {
    action.setStatus(false);
    action.setSubmitting(true);
    try {
      const { user, refreshToken, redirectUrl, message, status }: any =
        await signUp(values);

      if (redirectUrl || message) {
        action.setStatus({
          status,
          redirectUrl,
          message,
        });
      } else if (user || refreshToken) {
        setCookies(user, refreshToken);
        action.resetForm();
      }
      // If login modal is open
      if (login.isOpen) {
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
        isRegister: false,
        username: "imsamad",
        email: "imsamad00@gmail.com",
        password: "Password@1206",
        passwordConfirmation: "Password@1206",
      }}
      validationSchema={logInSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<any>) => {
        return (
          <Form>
            <LoginWrapper>
              <Header />
              <FormStatus />
              <FormFields />
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
