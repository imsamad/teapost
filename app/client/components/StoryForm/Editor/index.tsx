import {
  Box,
  Collapse,
  Progress,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { CustomError } from '@compo/FormFields';
import { submitStory } from '@lib/api/storyApi';
import * as React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import { setOptions } from './config/options';
import SaveButtonStyles from './config/saveButtonStyles';
import { useField } from 'formik';

export default function App() {
  const isLoading = useDisclosure();

  const [{ value }, { error, touched }, { setValue, setError }] =
    useField<string>('content');
  const [{ value: _id }] = useField<string>('_id');
  const toast = useToast();
  const onSave = async (ctx: string) => {
    isLoading.onOpen();
    submitStory({
      values: {
        content: ctx,
        _id,
        // slug: Router.query.slug as string,
      },
      type: 'content',
      storeResToLocal: true,
    })
      .then(() => {
        toast({
          status: 'success',
          title: 'Saved succefully',
          isClosable: true,
          variant: 'top-accent',
        });
      })
      .catch((errors) => {
        setError(errors.message || 'Invalid data');
        toast({
          status: 'error',
          title: 'Try again.',
          isClosable: true,
          variant: 'top-accent',
        });
      })
      .finally(() => {
        isLoading.onClose();
      });
  };
  const [{ value: isFromHistory }] = useField('isFromHistory');
  return (
    <Box className="App" zIndex="1">
      <CustomError errors={error} isError={Boolean(error && touched)} />
      <Collapse in={isLoading.isOpen}>
        {isLoading.isOpen && <Progress size="xs" isIndeterminate />}
      </Collapse>
      <SunEditor
        setContents={value}
        onChange={setValue}
        setAllPlugins={true}
        setOptions={setOptions()}
        autoFocus={false}
        onSave={onSave}
        hideToolbar={isFromHistory}
        disableToolbar={isFromHistory}
      />
      <SaveButtonStyles />
    </Box>
  );
}
