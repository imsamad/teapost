import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Profile from '../../models/Profile';
import Story from '../../models/Story';
import * as Yup from 'yup';
import validateSchema from '../../middleware/validateSchemaMdlwr';
import { isValidObjectId } from 'mongoose';

// @desc      Collab with other authors
// @route     PUT /api/v1/stories/collab/:storyId
// @access    Auth

const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    let userId = req.user._id,
      addAuthors: string[] = req.body?.addAuthors || [],
      removeAuthors: string[] = req.body?.removeAuthors || [];

    let story = await Story.findById(req.params.storyId);

    if (!story || story?.author?.toString() != userId)
      return next(ErrorResponse(400, 'Resource not found'));

    story.collabWith.addToSet(...addAuthors);
    story.collabWith.pull(...removeAuthors);

    story = await story.save();

    let promises: any = [];
    addAuthors.forEach((id) => {
      promises.push(
        Profile.findByIdAndUpdate(
          id,
          {
            _id: id, //@ts-ignore
            $addToSet: { collabStories: story._id },
          },
          {
            upsert: true,
          }
        )
      );
    });
    removeAuthors.forEach((id) => {
      promises.push(
        Profile.findByIdAndUpdate(
          id,
          {
            _id: id,
            //@ts-ignore
            $pull: { collabStories: story._id },
          },
          {
            upsert: true,
          }
        )
      );
    });
    await Promise.allSettled(promises);
    res.json({
      status: 'ok',
      story,
    });
  }
);

export const schema = Yup.object({
  params: Yup.object({
    storyId: Yup.string()
      .label('storyId')
      .required()
      .typeError('StoryId must be string type.')
      .test('storyId', 'Story Id must be a valid', (val) =>
        isValidObjectId(val)
      ),
  }),
  body: Yup.object()
    .shape(
      {
        addAuthors: Yup.array()
          .label('addAuthors')
          .when('removeAuthors', {
            is: (removeAuthors: any) => !removeAuthors,
            then: Yup.array()
              .required('Collab with is required')
              .typeError('It must be valid author ID array')
              .label('addAuthors')
              .min(1)
              .of(
                Yup.string()
                  .label('addAuthors')
                  .typeError('It must be valid author ID')
                  .test(
                    'addAuthors',
                    'It must be valid author id',
                    (val: any) => typeOf(val, 'mongoId')
                  )
              ),
          }),
        removeAuthors: Yup.array().when('addAuthors', {
          is: (addAuthors: any) => {
            return !addAuthors;
          },
          then: Yup.array()
            .required('Collab with is required')
            .typeError('It must be valid author ID array')
            .label('removeAuthors')
            .min(1)
            .of(
              Yup.string()
                .label('removeAuthors')
                .typeError('It must be valid author ID')
                .test(
                  'removeAuthors',
                  'It must be valid author id',
                  (val: any) => typeOf(val, 'mongoId')
                )
            ),
        }),
      },
      [['addAuthors', 'removeAuthors']]
    )
    .label('body')
    .test(
      'body',
      'Provide valid addAuthors or removeAuthors authorIds.',
      (body) => {
        let addAuthors: any = body?.addAuthors || [],
          removeAuthors: any = body?.removeAuthors || [];
        if (
          (!removeAuthors.length && !addAuthors.length) ||
          new Set([...addAuthors, ...removeAuthors])?.size !=
            addAuthors?.length + removeAuthors?.length
        )
          return false;
        return true;
      }
    ),
});

// export default { ctrl, schema: validateSchema(schema) };
export default [validateSchema(schema), ctrl];
