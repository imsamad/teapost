import { Request, Response, NextFunction } from 'express';

import { asyncHandler, ErrorResponse } from '../../lib/utils';
import Profile from '../../models/Profile';
import StoryMeta from '../../models/StoryMeta';
import Story, { StoryDocument } from '../../models/Story';
import { UserDocument } from '../../models/User';
import * as yup from 'yup';
import { isValidObjectId } from 'mongoose';
import validateSchema from '../../middleware/validateSchemaMdlwr';

// @desc      Like/Dislike story
// @route     PATCH /api/v1/story/grade/:storyId
// @access    Auth

const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // here might to do some extra bit of type-checking
    const like = req.body.like || !req.body.dislike;
    const undo = req.body.undo;

    const storyId = req.params.storyId as StoryDocument['id'];
    let story = await Story.findById(storyId);

    if (!story) return next(ErrorResponse(400, 'Resource not found'));

    // @ts-ignore
    const user = req.user._id.toString();

    await Profile.findByIdAndUpdate(
      user,
      like
        ? undo
          ? { _id: user, $pull: { likedStories: storyId } }
          : {
              _id: user,
              $addToSet: { likedStories: storyId },
              $pull: { dislikedStories: storyId },
            }
        : // If dislike
        undo
        ? { _id: user, $pull: { dislikedStories: storyId } }
        : {
            _id: user,
            $addToSet: { dislikedStories: storyId },
            $pull: { likedStories: storyId },
          },
      { upsert: true, new: true }
    );
    const storyMeta = await StoryMeta.findByIdAndUpdate(
      storyId,
      like
        ? !undo
          ? {
              _id: storyId,
              $addToSet: { likedBy: user },
              $pull: { dislikedBy: user },
            }
          : { _id: storyId, $pull: { likedBy: user } }
        : !undo
        ? {
            _id: storyId,
            $addToSet: { dislikedBy: user },
            $pull: { likedBy: user },
          }
        : { _id: storyId, $pull: { dislikedBy: user } },

      { upsert: true, new: true }
    );

    story.noOfLikes = storyMeta.likedBy.length;
    story.noOfDislikes = storyMeta.dislikedBy.length;

    res.json({
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
      .test('storyId', 'Story Id must be a valid', (val) =>
        isValidObjectId(val)
      ),
  }),
  body: yup
    .object()
    .shape(
      {
        like: yup
          .boolean()
          .label('like')
          .typeError('Express like in true/false')
          .when('dislike', {
            is: (dislike: any) => typeof dislike === 'undefined',
            then: yup.boolean().required('Like or dislike is required'),
          }),
        dislike: yup
          .boolean()
          .label('dislike')
          .typeError('Express dislike in true/false')
          .when('like', {
            is: (like: any) => typeof like === 'undefined',
            then: yup.boolean().required('Like or dislike is required'),
          }),
        undo: yup
          .boolean()
          .label('undo')
          .typeError('Express undo in booleans value'),
      },
      [['like', 'dislike']]
    )
    .label('body')
    .test('body', 'Provide appropriate data', (val) =>
      !val.dislike && !val.like ? false : true
    ),
});

export default [validateSchema(schema), ctrl];
