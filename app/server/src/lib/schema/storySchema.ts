import { object, string, array } from 'yup';
import { trimInside } from '../utils';

import { isValidObjectId } from 'mongoose';

export const isAbleToPublished = object({
  title: string()
    .label('title')
    .required('Title is required.')
    .typeError('Title must be string.')
    .test('title', 'Title must have 10 char minimum.', (val: any) =>
      trimInside(val, 10)
    ),

  titleImage: string()
    .label('titleImage')
    .required('titleImage is required.')
    .url('titleImage must be url')
    .typeError('titleImage must be url'),

  subtitle: string()
    .label('subtitle')
    .required('Subtitle is required')
    .typeError('Subtitle must be string')
    .test('subtitle', 'Subtitle must have 20 char minimum.', (val: any) =>
      trimInside(val, 20)
    ),

  slug: string()
    .label('slug')
    .required('Slug is required')
    .typeError('Slug must be string/url type'),

  tags: array()
    .label('tags')
    .typeError('tags must of type array')
    .min(1, 'Mimimun one tag is required.')
    .test((val: any) =>
      val && Array.isArray(val) ? val.every((v) => isValidObjectId(v)) : false
    ),
  content: string()
    .label('content')
    .required('Content of story is required')
    .typeError('Content must be string/url type')
    .test('content', 'Content must have 2200 char minimum.', (val: any) =>
      trimInside(val, 2220)
    ),
  keywords: string()
    .label('keywords')
    .required('Keywords of story is required')
    .typeError('Keywords must be string/url type')
    .test(
      'keywords',
      'Keywords must have atleast 10 char minimum.',
      (val: any) => trimInside(val, 10)
    ),
});
