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
  title: stringSchema('title', 10, 90),
  titleImage: string()
    .label('titleImage')
    .required('titleImage is required.')
    .url('titleImage must be url')
    .typeError('titleImage must be url'),
  subtitle: stringSchema('subtitle', 10, 175),
  slug: string()
    .required('slug is required to create a story')
    .label('slug')
    .typeError('slug must be string'),
  tags: array()
    .min(1, 'Minimum one tag is required.')
    .required('Minimum one tag is required')
    .label('tags')
    .typeError('tags must be array type'),
  body: stringSchema('body', 2200, Infinity),
  keywords: stringSchema('keywords', 10, 150),
});
