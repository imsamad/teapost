import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import Story from '../../models/Story';
import { isValidObjectId } from 'mongoose';

const unCollabMeMultiple = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id.toString();
    console.log('req.body.storyIds ', req.body.storyIds);
    const story = await Story.updateMany(
      { _id: { $in: req.body.storyIds } },
      { $pull: { collabWith: user } }
    );

    return res.json({
      status: 'ok',
      message: 'Uncollabed',
    });
  }
);

export const schema = yup.object({
  body: yup.object({
    storyIds: yup
      .array()
      .label('storyIds')
      .required()
      .typeError('StoryIds must be array of storyId')
      .of(
        yup
          .string()
          .label('storyIds')
          .test('storyIds', 'Provide valid storyIds', isValidObjectId)
      )
      .min(1),
  }),
});

export default [validateSchemaMdlwr(schema), unCollabMeMultiple];
