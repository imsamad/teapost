import { NextFunction, Request, Response } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import StoryCollection from '../../models/StoryCollection';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Create Collection
// @route     POST /api/v1/collections/:collectionId
// @access    Auth
export const updateCollection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //   @ts-ignore
    const user = req.user._id;
    let collection = await StoryCollection.findOne({
      _id: req.params.collectionId,
      user,
    });

    if (!collection) return next(ErrorResponse(404, 'Resource not found'));

    collection.title = req.body?.title || collection.title;
    collection.description = req.body?.description || collection.description;
    collection.stories = req.body?.stories || collection.stories;
    collection = await collection.save();

    return res.json({ status: 'ok', collection });
  }
);

const schema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .label('title')
      .typeError('Title must be of type string'),
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
            return typeOf(val, 'mongoId');
          })
      )
      .label('stories')
      .typeError('Stories must be of type array of valid storyId'),
  }),
});

export default [validateSchemaMdlwr(schema), updateCollection];
