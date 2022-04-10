import { updateDetailFields } from "@lib/api/authApi";
import { useField, useFormikContext } from "formik";

import { TPPassword, TPInput } from "@compo/FormFields";
import { toPascalCase } from "@lib/utils";
import TSButton from "@compo/UI/TSButton";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import FormStatus from "../Status";
const Fields = () => {
  const [{ value }] = useField<"changePassword" | "changeEmail">("type");
  const formikProps = useFormikContext();
  const { isSubmitting } = formikProps;

  return (
    <>
      <ModalHeader>{toPascalCase(value)}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <>
          <FormStatus />
          {value == "changeEmail" ? (
            <TPInput name="newEmail" label="New Email" size="sm" />
          ) : (
            updateDetailFields[value].map((field) => {
              return (
                <TPPassword
                  label={toPascalCase(field)}
                  key={field}
                  // @ts-ignore
                  placeholder={field}
                  name={field}
                  noLeftAddon={true}
                />
              );
            })
          )}
        </>
      </ModalBody>
      <ModalFooter>
        <TSButton
          rightIcon={<ArrowRightIcon fontSize="sm" />}
          type="submit"
          isFullWidth
          size="md"
          colorScheme="blue"
          variant="outline"
          isLoading={isSubmitting}
          onClick={() => {}}
        >
          Submit
        </TSButton>
      </ModalFooter>
    </>
  );
};

export default Fields;
