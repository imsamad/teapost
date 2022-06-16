import { useToast } from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';

import {
  createCollectionApi,
  updateCollectionApi,
} from '@lib/api/collectionApi';

import { trimExtra } from '@lib/utils';
import { useProfile } from '@compo/Context';
import NewCollectionFormFields from './NewCollectionFormFields';

interface NewCollData {
  title: string;
  description?: string;
}

const NewCollForm = ({
  onCancel,
  editFormData,
}: {
  onCancel?: () => void;
  editFormData?: {
    collectionId: string;
    isEdit: boolean;
    preValues: NewCollData;
    editCB: (title: string, description: string) => void;
  };
}) => {
  const { myProfile, mutateProfile } = useProfile();

  const toast = useToast();
  const handleSubmit = async (
    val: NewCollData,
    actions: FormikHelpers<NewCollData>
  ) => {
    const submitFun: any = editFormData?.isEdit
      ? updateCollectionApi(editFormData.collectionId, val)
      : createCollectionApi(val);

    submitFun
      .then((data: any) => {
        toast({
          title: editFormData?.isEdit ? 'Edit' : 'Saved',
          status: 'success',
          duration: 1000,
          isClosable: true,
          position: 'bottom',
        });

        actions.setSubmitting(false);
        actions.resetForm();
        if (editFormData?.isEdit && editFormData?.editCB)
          editFormData?.editCB(
            data.collection.title,
            data.collection.description
          );
        else mutateProfile();
        onCancel && onCancel();
      })
      .catch(() => {
        toast({
          title: `Unable to ${
            editFormData?.isEdit ? 'Edit' : 'Saved'
          }, please retry.`,
          status: 'error',
          duration: 1000,
          isClosable: true,
          position: 'bottom',
        });
        actions.setSubmitting(false);
      });
  };
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        ...editFormData?.preValues,
      }}
      // @ts-ignore
      onSubmit={handleSubmit}
      validate={(value) => {
        let errors: { title?: string } = {};
        if (!value.title || !trimExtra(value.title, 1))
          errors.title = 'Title is required.';
        return errors;
      }}
    >
      <NewCollectionFormFields
        onCancel={onCancel}
        isEdit={!!editFormData?.isEdit}
      />
    </Formik>
  );
};

export default NewCollForm;
