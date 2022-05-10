import { Request, Response, NextFunction } from 'express';

import { object, string } from 'yup';

import { isValidObjectId } from 'mongoose';
import validateSchema from '../../middleware/validateSchemaMdlwr';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import Story from '../../models/Story';

// @desc      Delete story
// @route     DELETE /api/v1/story/:storyId
// @access    Auth,Admin

const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //  @ts-ignore
    const { _id: user, role } = req.user;
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return next(ErrorResponse(400, 'Resource not found'));
    }
    if (story.author.toString() != user && role != 'admin')
      return next(ErrorResponse(400, 'Not authorised'));

    await story.remove();
    return res.json({
      status: 'deleted',
    });
  }
);

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
