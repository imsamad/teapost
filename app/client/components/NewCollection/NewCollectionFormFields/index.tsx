import { Button, Divider, Heading, HStack, Stack } from '@chakra-ui/react';
import NewCollectionBtn from '@compo/CollectionDrawer/NewCollectionBtn';
import { TPInput, TPTextarea } from '@compo/FormFields';
import { Form, useFormikContext } from 'formik';
import React from 'react';

const NewCollectionFormFields = ({
  isEdit,
  onCancel,
}: {
  isEdit: boolean;
  onCancel?: () => void;
}) => {
  const { isSubmitting } = useFormikContext();
  return (
    <Form>
      <Stack rounded="md" border="1px" borderColor="gray.500" p={4} mb={2}>
        <Heading fontSize="lg" textAlign="center" fontWeight={800}>
          {isEdit ? 'Edit Collection ' : 'Create new collection'}
        </Heading>
        <Divider />

        <TPInput
          isRequired={true}
          label={'Title'}
          name="title"
          placeholder="Enter unique title"
          size="sm"
        />
        <TPTextarea
          name="description"
          placeholder="Write a short & sweet description..."
          label="Description"
        />
        <HStack justifyContent="flex-end">
          <Button
            variant="outline"
            colorScheme="red"
            mr={3}
            onClick={() => onCancel && onCancel()}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            colorScheme="linkedin"
            size="sm"
            type="submit"
            isLoading={isSubmitting}
            loadingText={isEdit ? 'Editing...' : 'Saving...'}
          >
            {isEdit ? 'Edit' : 'Save'}
          </Button>
        </HStack>
      </Stack>
    </Form>
  );
};

export default NewCollectionFormFields;
