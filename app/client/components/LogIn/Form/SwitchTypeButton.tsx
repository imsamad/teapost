import TSButton from "@compo/UI/TSButton";
import { AuthType } from "@lib/api/authApi";
import { toPascalCase } from "@lib/utils";
import { useFormikContext } from "formik";
import React from "react";

const SwitchTypeButton = ({ type }: { type: AuthType["type"] }) => {
  const {
    values: { type: modeType },
    setStatus,
    setErrors,
    setFieldValue,
  } = useFormikContext<AuthType>();

  const handleClick = (type: AuthType["type"]) => {
    setFieldValue("type", type, false);
    setErrors({});
    setStatus(null);
  };

  return (
    <TSButton
      variant="link"
      colorScheme="blue"
      onClick={() => handleClick(type)}
      disabled={modeType == type}
    >
      {toPascalCase(type)}
    </TSButton>
  );
};

export default SwitchTypeButton;
