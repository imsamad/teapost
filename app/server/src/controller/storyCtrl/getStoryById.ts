import { Request, Response, NextFunction } from 'express';
import { object, string } from 'yup';

import { isValidObjectId } from 'mongoose';
import validateSchema from '../../middleware/validateSchemaMdlwr';
import { asyncHandler } from '../../lib/utils';
import Story from '../../models/Story';
// @desc      getStoryById
// @route     GET /api/v1/stories/:storyId
// @access    Auth,Admin,Public

export const ctrl = asyncHandler(async (req: Request, res: Response) => {
  const story = await Story.findById(req.params.storyId).lean();

  if (story?.isPublished) {
    return res.json({
      status: 'ok',
      story,
    });
  } else {
    // @ts-ignore
    const user = req?.user?._id;
    if (
      user &&
      // isAuthor
      (user == story?.author.toString() ||
        // or collaborator
        story?.collabWith.map((id) => id.toString()).includes(user))
    )
      return res.json({
        status: 'ok',
        story,
      });
    else {
      return res.status(400).json({
        status: 'error',
        story: null,
        message: `Story not exist with id ${req.params.storyId}`,
      });
    }
  }
});
const schema = object({
  params: object({
    storyId: string()
      .label('storyId')
      .required()
      .typeError('StoryId must be string type.')
      .test('storyId', 'Story Id must be a valid', (val) =>
        isValidObjectId(val)
      ),
  }),
});
export default [validateSchema(schema), ctrl];
