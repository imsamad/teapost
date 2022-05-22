import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import Story from '../../models/Story';
import { isValidObjectId } from 'mongoose';

const unCollabMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id.toString();

    const story = await Story.findById(req.params.storyId);
    if (!story?.collabWith.filter((id) => id.toString() == user).length)
      return next(ErrorResponse(400, `You weren't collabing.`));

    story.collabWith.pull(user);
    return res.json({
      status: 'ok',
      story: await story.save(),
    });
  }
);

export const schema = yup.object({
  params: yup.object({
    storyId: yup
      .string()
      .label('storyId')
      .required()
      .typeError('StoryId must be string type.')
      .test('storyId', 'Story Id must be a valid', (val: any) =>
        isValidObjectId(val)
      ),
  }),
});

export default [validateSchemaMdlwr(schema), unCollabMe];
