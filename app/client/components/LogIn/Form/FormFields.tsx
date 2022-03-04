import { EmailIcon } from '@chakra-ui/icons';

import { useField } from 'formik';

import { FaUserAlt as UserIcon } from 'react-icons/fa';
import CustomInput from '../../FormFields/Input';

import CustomPassword from '../../FormFields/Password';
const FormFields = () => {
  const [, { value: isRegister }] = useField('isRegister');
  return (
    <>
      {isRegister && (
        <CustomInput
          name="username"
          placeholder="John Doe"
          LeftAddOn={<UserIcon />}
        />
      )}
      <CustomInput
        name="email"
        placeholder="johndoe@email.com"
        LeftAddOn={<EmailIcon />}
        isRequired={true}
      />
      <CustomPassword name="password" />
      {isRegister && (
        <CustomPassword
          name="passwordConfirmation"
          placeholder="Confirm Password"
        />
      )}
    </>
  );
};

export default FormFields;
