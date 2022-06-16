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
import { cloudinaryUrl } from '@lib/utils';
import { FormEvent, FormEventHandler, useState } from 'react';

const CommentForm = ({
  onSubmitCB,
  showAvatar = false,
  type,
  placeholer = 'Reply',
  value: valueProp,
  onCancel,
}: {
  showAvatar?: boolean;
  type: 'edit' | 'add';
  onSubmitCB: (val: string) => Promise<void>;
  placeholer?: string;
  value?: string;
  onCancel?: () => void;
}) => {
  const [value, setValue] = useState(valueProp || '');
  const { auth, openLoginToast } = useAuthCtx();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim().length) return;

    if (!auth?.user?._id) {
      openLoginToast();
      return;
    }
    onSubmitCB(value).then(() => {
      setValue('');
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <HStack flex="1">
        {showAvatar && (
          <Avatar
            alignSelf="flex-start"
            name={auth?.user?.username}
            src={cloudinaryUrl({
              width: 20,
              height: 20,
              src: auth?.user?.profilePic!,
            })}
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
                type="submit"
                isDisabled={!value.trim()}
                onClick={handleSubmit}
              >
                {type == 'edit' ? 'Edit' : 'Save'}
              </TSButton>
            </ButtonGroup>
          </Collapse>
        </Stack>
      </HStack>
    </form>
  );
};

export default CommentForm;
