import { NextFunction, Request, Response } from 'express';
import {
  asyncHandler,
  ErrorResponse,
  trimInside,
  typeOf,
} from '../../lib/utils';
import StoryCollection from '../../models/StoryCollection';
import * as yup from 'yup';
import { isValidObjectId } from 'mongoose';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Create Collection
// @route     POST /api/v1/collection
// @access    Auth
const createCollection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //   @ts-ignore
    const user = req.user._id;
    const isExist = await StoryCollection.findOne({
      title: new RegExp('^' + req.body.title + '$', 'i'),
      user,
    });
    if (isExist)
      return next(
        ErrorResponse(400, {
          title: `${req.body.title} already created by you`,
        })
      );

    const collection = await StoryCollection.create({
      user,
      ...req.body,
    });
    return res.json({ status: 'ok', collection });
  }
);
const schema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .label('title')
      .required('Title is required')
      .typeError('Title must be of type string')
      .test('title', 'Title must have atleast 3 chars', (val: any) =>
        trimInside(val, 3)
      ),

    description: yup
      .string()
      .label('description')
      .typeError('Description must be of type string'),
    stories: yup
      .array()
      .of(
        yup
          .string()
          .label('stories')
          .test('stories', 'Stories must be valid ids', (val: any) => {
            return typeOf(val, 'string') ? isValidObjectId(val) : false;
          })
      )
      .label('stories')
      .typeError('Stories must be of type array of valid storyId'),
  }),
});
export default [validateSchemaMdlwr(schema), createCollection];
