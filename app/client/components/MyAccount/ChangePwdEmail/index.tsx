import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useAuthCtx } from "@compo/Context";
import { changeEmail, updateProfile } from "@lib/api/authApi";
import { changePwdEmailScheme } from "@lib/schema/auth";
import { Form, Formik } from "formik";
import React from "react";
import Fields from "./Fields";

const ChangePwdEmail = ({
  type,
  submitCB,
  isOpen,
  onClose,
}: {
  type: "changePassword" | "changeEmail";
  submitCB?: () => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { auth } = useAuthCtx();

  return (
    <>
      {isOpen && (
        <Modal
          closeOnOverlayClick={false}
          isOpen={isOpen}
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
                currentPassword: "Password@1206",
                newPassword: "Password@1206",
                confirmNewPassword: "Password@1206",
                newEmail: "imsamad@gmail.com",
              }}
              onSubmit={(values, actions) => {
                if (values.type == "changePassword") {
                  if (values.newPassword == values.currentPassword) {
                    actions.setFieldError("newPassword", "Same as previous ");
                    actions.setSubmitting(false);
                    return;
                  }
                  updateProfile({ type: "password", reqBody: values })
                    .then(() => {
                      actions.resetForm();
                      onClose();
                    })
                    .finally(() => {
                      submitCB && submitCB();
                    })
                    .catch((err) => {
                      actions.setSubmitting(false);
                      actions.setErrors(err.message);
                    });
                } else {
                  if (auth.user?.email == values.newEmail) {
                    actions.setFieldError("newEmail", "Same as previous ");
                    actions.setSubmitting(false);
                    return;
                  }
                  changeEmail(values.newEmail)
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
