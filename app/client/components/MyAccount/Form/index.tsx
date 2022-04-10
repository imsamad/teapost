import { useAuthCtx } from "@compo/Context";
import { Formik, Form } from "formik";
import Fields from "./Fields";

import { UpdatDetailsType, updateProfile } from "@lib/api/authApi";
import { useToast } from "@chakra-ui/react";

const Index = () => {
  const {
    auth: { user },
    setAuth,
  } = useAuthCtx();
  const toast = useToast();
  return (
    <Formik
      initialValues={{
        fullName: user?.fullName,
        username: user?.username,
        tagLines: user?.tagLines,
        email: user?.email,
      }}
      onSubmit={(val, actions) => {
        const reqBody: Partial<UpdatDetailsType> = {};
        if (val.fullName != user?.fullName) reqBody.fullName = val.fullName;
        if (val.username != user?.username) reqBody.username = val.username;

        if (
          val.tagLines &&
          user?.tagLines &&
          new Set([...val.tagLines, ...user?.tagLines]).size !=
            user?.tagLines?.length
        )
          reqBody.tagLines = val.tagLines;
        if (!Object.keys(reqBody).length) {
          toast({
            title: "No changes occur",
            status: "warning",
            // variant: "top-accent",
            isClosable: true,
          });
          actions.setSubmitting(false);
        } else
          updateProfile({ type: "other", reqBody })
            .then((res) => {
              setAuth({ accessToken: res.accessToken, user: res.user });
              if (res.message) {
                // @ts-ignore
                actions.setErrors(res?.message);
              }
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
      }}
    >
      <Form>
        <Fields />
      </Form>
    </Formik>
  );
};

export default Index;
