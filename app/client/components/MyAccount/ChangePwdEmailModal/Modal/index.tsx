import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';
import { changeEmailApi, updateProfileApi } from '@lib/api/authApi';
import { changePwdEmailScheme } from '@lib/schema/auth';
import { Form, Formik } from 'formik';

import Fields from '../Fields';

const ChangePwdEmail = ({
  type,
  submitCB,
  onClose,
}: {
  type: 'changePassword' | 'changeEmail' | '';
  submitCB?: () => void;

  onClose: () => void;
}) => {
  const { auth } = useAuthCtx();

  return (
    <>
      {!!type && (
        <Modal
          closeOnOverlayClick={false}
          isOpen={!!type}
          onClose={onClose}
          isCentered
          scrollBehavior="inside"
          motionPreset="slideInRight"
        >
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <Formik
              initialValues={{
                type,
                currentPassword: 'Password@1206',
                newPassword: 'Password@1206',
                confirmNewPassword: 'Password@1206',
                newEmail: 'newEmail@email.com',
              }}
              onSubmit={(values, actions) => {
                if (values.type == 'changePassword') {
                  if (values.newPassword == values.currentPassword) {
                    actions.setFieldError('newPassword', 'Same as previous ');
                    actions.setSubmitting(false);
                    return;
                  }
                  updateProfileApi({ type: 'password', reqBody: values })
                    .then(() => {
                      actions.resetForm();
                      onClose();
                    })
                    .catch((err) => {
                      actions.setSubmitting(false);
                      actions.setErrors(err.message);
                    })
                    .finally(() => {
                      submitCB && submitCB();
                    });
                } else {
                  if (auth?.user?.email == values.newEmail) {
                    actions.setFieldError('newEmail', 'Same as previous ');
                    actions.setSubmitting(false);
                    return;
                  }
                  changeEmailApi(values.newEmail)
                    .then((data) => {
                      actions.setStatus(data);
                      actions.setSubmitting(false);
                    })
                    .catch((err) => {
                      actions.setSubmitting(false);
                      actions.setErrors(err.message);
                    })
                    .finally(() => {
                      submitCB && submitCB();
                      // actions.setSubmitting(false);
                    });
                }
              }}
              validationSchema={changePwdEmailScheme}
            >
              <Form>
                <Fields />
              </Form>
            </Formik>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ChangePwdEmail;
