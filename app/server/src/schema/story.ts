import { isValidObjectId } from 'mongoose';
import { array, boolean, object, string } from 'yup';
import { trimExtra } from '../lib/utils';

export const changeSlugSchema = object({
  body: object({
    slug: string()
      .label('slug')
      .typeError('It must be string')
      .required('It is required'),
    id: string()
      .label('id')
      .required('It is required')
      .test('id', 'It is not valid id.', (val) => isValidObjectId(val)),
  }),
});

export const publishedStorySchema = object({
  params: object({
    storyId: string()
      .label('storyId')
      .required('Story id is required')
      .test('id', 'story id is invalid.', (val) => isValidObjectId(val)),
  }),
  body: object({
    isPublished: boolean()
      .nullable()
      .label('isPublished')
      .typeError('Only boolean values are allowed'),
  }),
});

export const createStorySchema = object({
  body: object().shape(
    {
      title: string().label('title').typeError('title must be string'),
      // titleImage: string()
      //   .label('titleImage')
      //   .url('titleImage must be url')
      //   .typeError('titleImage must be url'),
      subtitle: string().label('subtitle').typeError('subtitle must be string'),
      tags: array().label('tags').typeError('tags must be array'),
      body: string().label('body').typeError('body must be string'),
      keywords: string().label('keywords').typeError('keyword must be string'),
      slug: string()
        .trim()
        .label('slug')
        .typeError('It must be string type')
        .when('id', {
          is: (id: string) => !id,
          then: string()
            .required('It is required')
            .min(8, 'It must be above 8 char')
            .test('slug', 'Slug must be above 8 char', (val) =>
              trimExtra(val, 8, '')
            )
            .required('It is required to create a story'),
        }),
      additionalTags: array()
        .label('additionalTags')
        .typeError('It must be array'),
      id: string()
        .label('id')
        .when('slug', {
          is: (slug: string) => !slug,
          then: string()
            .required('It is required')
            .test('id', 'It is not valid id.', (val) => isValidObjectId(val)),
        }),
    },
    [['id', 'slug']]
  ),
});

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
    .label(label)
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

function notRequiredStringSchema(
  label: string,
  minLength: number,
  maxLength: number
) {
  let msg = `${label} length must be`;
  maxLength !== Infinity
    ? (msg += ` between ${minLength} & ${maxLength} chars`)
    : (msg += ` above ${minLength} chars`);
  return string()
    .nullable()
    .optional()
    .trim()
    .test(label, msg, (val) =>
      !val
        ? true
        : trimExtra(val, minLength) && stringLength(val, minLength, maxLength)
    )
    .label(label)
    .typeError(`${label} must be string`);
}

function stringLength(str: any, min: number, max: number) {
  return !str ? false : str.length < max && str.length > min;
}
