import {
  Avatar,
  ButtonGroup,
  Collapse,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';
import TSButton from '@compo/UI/TSButton';
import { useState } from 'react';

const InputField = ({
  onSave,
  showAvatar = false,
  type,
  placeholer = 'Reply',
  value: valueClone,
  onCancel,
}: {
  showAvatar?: boolean;
  type: 'edit' | 'add';
  onSave: (val: string) => Promise<void>;
  placeholer?: string;
  value?: string;
  onCancel?: () => void;
}) => {
  const [value, setValue] = useState(valueClone || '');
  const { auth, openLoginToast } = useAuthCtx();
  return (
    <HStack flex="1">
      {showAvatar && (
        <Avatar
          alignSelf="flex-start"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
          size="sm"
          mr="2"
        />
      )}
      <Stack flex="1">
        <Input
          size="sm"
          borderRadius="md"
          placeholder={placeholer}
          value={value}
          onChange={({ target: { value } }) => {
            setValue(value);
          }}
        />
        <Collapse in={Boolean(value)}>
          <ButtonGroup justifyContent="flex-end" w="full">
            <TSButton
              size="xs"
              colorScheme="red"
              variant="outline"
              onClick={() => {
                setValue('');
                onCancel && onCancel();
              }}
            >
              Cancel
            </TSButton>
            <TSButton
              size="xs"
              colorScheme="blue"
              isDisabled={!value.trim()}
              onClick={() => {
                if (!auth?.user?._id) {
                  openLoginToast();
                  return;
                }
                onSave(value).then(() => {
                  setValue('');
                });
              }}
            >
              {type == 'edit' ? 'Edit' : 'Save'}
            </TSButton>
          </ButtonGroup>
        </Collapse>
      </Stack>
    </HStack>
  );
};

export default InputField;
