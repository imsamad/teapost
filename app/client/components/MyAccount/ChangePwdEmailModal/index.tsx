import { ButtonGroup } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import { useState } from 'react';
import Modal from './Modal';
const ChangePwdEmail = () => {
  const [type, setType] = useState<'changePassword' | 'changeEmail' | ''>('');
  return (
    <>
      <ButtonGroup display="flex" my={2}>
        <TSButton
          size="sm"
          flex="0.5"
          onClick={() => {
            setType('changeEmail');
          }}
        >
          Edit Email
        </TSButton>

        <TSButton
          size="sm"
          flex="0.5"
          onClick={() => {
            setType('changePassword');
          }}
        >
          Edit Password
        </TSButton>
      </ButtonGroup>
      <Modal
        type={type}
        onClose={() => {
          setType('');
        }}
      />
    </>
  );
};

export default ChangePwdEmail;
