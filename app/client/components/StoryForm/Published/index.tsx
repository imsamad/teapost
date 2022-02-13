import { Switch } from '@chakra-ui/react';
import {
  Field,
  FieldProps,
  FormikProps,
  useField,
  useFormikContext,
} from 'formik';
import { isAbleToPublished } from '../../../lib/Schema/storySchema';
import { validateYupSchema } from '../../../lib/utils';

const Index = () => {
  const [, meta, helpers] = useField('isPublished');
  const { values, setFieldValue, setFieldTouched, setStatus, setErrors } =
    useFormikContext();
  // console.log('formikCtx ', formikCtx);
  const handleChange = async () => {
    // @ts-ignore
    validateYupSchema(isAbleToPublished, values)
      .then((res) => {
        console.log('res');
        // @ts-ignore
        setFieldValue('isPublished', !values.isPublished);
        setFieldTouched('isPublished', true);
      })
      .catch((err) => {
        console.log('err ', err);
        setStatus(true);
        Object.keys(err).forEach((key: any) => {
          setFieldTouched(key, true, false);
        });
        setErrors(err);
      });
  };
  return (
    <Field name="isPublished" type="radio">
      {(formikProps: FieldProps) => {
        return (
          <Switch // @ts-ignore
            isChecked={values.isPublished}
            onChange={handleChange}
          />
        );
      }}
    </Field>
  );
};

export default Index;
