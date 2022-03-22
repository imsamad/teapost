import TSButton from "@compo/UI/TSButton";
import { useFormikContext } from "formik";
import React from "react";

const SaveButton = () => {
  const { isSubmitting } = useFormikContext();
  return (
    <TSButton
      isFullWidth={false}
      size="sm"
      colorScheme="blue"
      maxW="xs"
      type="submit"
      loadingText="Saving..."
      isLoading={isSubmitting}
    >
      Save
    </TSButton>
  );
};

export default SaveButton;
