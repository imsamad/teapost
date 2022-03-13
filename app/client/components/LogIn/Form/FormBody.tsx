import { EmailIcon } from "@chakra-ui/icons";
import { useField } from "formik";
import { FaUserAlt as UserIcon } from "react-icons/fa";

import { TPInput, TPPassword } from "../../FormFields";

const FormBody = () => {
  const [, { value: isRegister }] = useField("isRegister");
  return (
    <>
      {isRegister && (
        <TPInput
          name="username"
          placeholder="John Doe"
          LeftAddOn={<UserIcon />}
        />
      )}
      <TPInput
        name="email"
        placeholder="johndoe@email.com"
        LeftAddOn={<EmailIcon />}
        isRequired={true}
      />
      <TPPassword name="password" />
      {isRegister && (
        <TPPassword
          name="passwordConfirmation"
          placeholder="Confirm Password"
        />
      )}
    </>
  );
};

export default FormBody;
