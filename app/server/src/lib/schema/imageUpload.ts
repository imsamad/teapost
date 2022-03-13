import * as yup from 'yup';
const oneMB: number = 1_000_000;
export const imageUploadSchema = yup.object({
  files: yup
    .object({
      image: yup
        .object({
          size: yup
            .number()
            .max(oneMB * 4, 'Max image size is 4mb')
            .label('image'),
          mimetype: yup
            .string()
            .required()
            .test('image', 'Only images are supported ', (val: any) =>
              val.includes('image')
            )
            .label('image'),
        })
        .required('image is required')
        .label('image'),
    })
    .nullable()
    .required('image is required')
    .label('image'),
});
