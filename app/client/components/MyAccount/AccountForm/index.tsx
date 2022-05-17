import { useAuthCtx } from '@compo/Context';
import { Formik, Form } from 'formik';
import Fields from './Fields';

import { UpdatDetailsType, updateProfileApi } from '@lib/api/authApi';
import { useToast } from '@chakra-ui/react';
import ProfilePic from './ProfilePic';

const AccountForm = () => {
  const { auth, setAuth } = useAuthCtx();
  const toast = useToast();
  return (
    <>
      <ProfilePic />
      <Formik
        initialValues={{
          fullName: auth?.user?.fullName,
          username: auth?.user?.username,
          tagLines: auth?.user?.tagLines,
          email: auth?.user?.email,
        }}
        onSubmit={(val, actions) => {
          const reqBody: Partial<UpdatDetailsType> = {};
          if (val.fullName != auth?.user?.fullName)
            reqBody.fullName = val.fullName;
          if (val.username != auth?.user?.username)
            reqBody.username = val.username;

          if (
            val.tagLines &&
            auth?.user?.tagLines &&
            new Set([...val.tagLines, ...auth?.user?.tagLines]).size !=
              auth?.user?.tagLines?.length
          )
            reqBody.tagLines = val.tagLines;
          if (!Object.keys(reqBody).length) {
            toast({
              title: 'No changes occur',
              status: 'warning',
              // variant: "top-accent",
              isClosable: true,
            });
            actions.setSubmitting(false);
          } else
            updateProfileApi({ type: 'other', reqBody })
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
    </>
  );
};

export default AccountForm;
