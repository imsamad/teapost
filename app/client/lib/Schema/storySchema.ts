import { array, object, string } from 'yup';
import { trimExtra } from '../utils';

const stringSchema = (label: string, minLength: number, maxLength: number) => {
  let minLengthMsg = `Min length for ${label} is ${minLength} chars`;
  let maxLengthMsg = `Max length ${label} is ${maxLength} chars`;

  return string()
    .trim()
    .min(minLength, minLengthMsg)
    .max(maxLength, maxLengthMsg)
    .required(`${label} is required`)
    .test(label, minLengthMsg, (val) => {
      const res = trimExtra(val, minLength);
      return res;
    })
    .label(label.toLowerCase())
    .typeError(`${label} must be string`);
};

export const isAbleToPublished = object({
  title: stringSchema('Title', 40, 70),
  titleImage: string()
    .url('TitleImage must be url')
    .label('titleImage')
    .required('TitleImage is required')
    .typeError('TitleImage must be url'),
  subtitle: stringSchema('Subtitle', 60, 175),
  slug: string()
    .required('Slug is required to create a story')
    .label('slug')
    .typeError('Slug must be string'),
  tags: array()
    .min(1, 'Minimum one tag is required')
    .required('Minimum one tag is required')
    .label('tags')
    .typeError('Tags must be array type'),
  body: stringSchema('Body', 2200, Infinity),
  keywords: stringSchema('Keywords', 10, 25),
});
