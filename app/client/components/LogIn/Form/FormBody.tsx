import { AuthType, formFields } from "@lib/api/authApi";
import { toPascalCase } from "@lib/utils";
import { useField } from "formik";

import { TPInput, TPPassword } from "../../FormFields";

const FormBody = () => {
  const [, { value: type }] = useField<AuthType["type"]>("type");
  return (
    <>
      {formFields[type].map((field) => {
        return field.startsWith("password") ? (
          <TPPassword
            label={toPascalCase(field)}
            key={field}
            name={field}
            noLeftAddon={true}
          />
        ) : (
          <TPInput
            label={toPascalCase(field)}
            key={field}
            name={field}
            // LeftAddOn={<user/>}
            // LeftAddOn={<UserIcon />}
          />
        );
      })}
    </>
  );
};

export default FormBody;
