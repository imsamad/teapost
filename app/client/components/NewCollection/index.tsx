import {
  Button,
  Stack,
  HStack,
  Heading,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import {
  createCollectionApi,
  updateCollectionApi,
} from '@lib/api/collectionApi';
import { trimExtra } from '@lib/utils';
import { useProfile } from '../Context';
import { TPInput, TPTextarea } from '../FormFields';
import { StoryCollectionType } from '@lib/types/StoryCollectionType';

const NewCollForm = ({
  onCancel,
  editObj,
}: {
  onCancel?: () => void;
  editObj?: {
    collectionId: string;
    isEdit: boolean;
    preValues: Pick<StoryCollectionType, 'title' | 'description'>;
    editCB: (title: string, description: string) => void;
  };
}) => {
  const { myProfile, mutateProfile } = useProfile();

  const alreadyCreatedCollections = myProfile?.profile?.storyCollections
    ?.map((collection) => collection?.title?.toLowerCase())
    .filter((title) => title != editObj?.preValues?.title?.toLowerCase());

  const toast = useToast();
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        ...editObj?.preValues,
      }}
      onSubmit={async (val, actions) => {
        let obj: any = { title: val.title };
        // @ts-ignore
        if (val.description) obj.description = val.description;
        const fun: any = editObj?.isEdit
          ? updateCollectionApi(editObj.collectionId, obj)
          : createCollectionApi(obj);

        fun
          .then((data: any) => {
            toast({
              title: editObj?.isEdit ? 'Edit' : 'Saved',
              status: 'success',
              duration: 1000,
              isClosable: true,
              position: 'bottom',
            });

            actions.setSubmitting(false);
            actions.resetForm();
            if (editObj?.isEdit && editObj?.editCB)
              editObj?.editCB(
                data.collection.title,
                data.collection.description
              );
            else mutateProfile();
            onCancel && onCancel();
          })
          .catch(() => {
            toast({
              title: `Unable to ${
                editObj?.isEdit ? 'Edit' : 'Saved'
              }, please retry.`,
              status: 'error',
              duration: 1000,
              isClosable: true,
              position: 'bottom',
            });
            actions.setSubmitting(false);
          });
      }}
      validate={(value) => {
        let errors: { title?: string } = {};
        if (!value.title || !trimExtra(value.title, 1))
          errors.title = 'Title is required.';
        if (alreadyCreatedCollections?.includes(value.title.toLowerCase()))
          errors.title = 'This already exist';
        return errors;
      }}
    >
      {(formikProps) => {
        return (
          <Form>
            <Stack rounded="md" border="1px" borderColor="gray.300" p="2">
              {!editObj?.isEdit && (
                <>
                  <Heading fontSize="md" textAlign="center" fontWeight={400}>
                    Create new collection
                  </Heading>{' '}
                  <Divider />
                </>
              )}

              <TPInput
                isRequired={true}
                label={editObj?.isEdit ? undefined : 'Title'}
                name="title"
                placeholder="Enter unique title"
                size="sm"
              />
              <TPTextarea
                name="description"
                placeholder="Write a short & sweet description..."
                label="Description"
              />
              <HStack>
                <Button variant="outline" mr={3} onClick={onCancel} size="sm">
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  size="sm"
                  type="submit"
                  isLoading={formikProps.isSubmitting}
                  loadingText={editObj?.isEdit ? 'Editing...' : 'Saving...'}
                >
                  {editObj?.isEdit ? 'Edit' : 'Save'}
                </Button>
              </HStack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default NewCollForm;
