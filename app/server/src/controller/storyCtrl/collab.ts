import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';

import Story from '../../models/Story';
import * as yup from 'yup';
import validateSchema from '../../middleware/validateSchemaMdlwr';
import { isValidObjectId } from 'mongoose';

// @desc      Collab with other authors
// @route     PUT /api/v1/stories/collab/:storyId
// @access    Auth

const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    let author = req.user._id,
      addAuthors: string[] = req.body?.addAuthors || [],
      removeAuthors: string[] = req.body?.removeAuthors || [];

    let story = await Story.findOne({ _id: req.params.storyId, author });

    if (!story) return next(ErrorResponse(400, 'Resource not found'));

    console.log('addAuthors ', addAuthors);
    story.collabWith.addToSet(...addAuthors);
    story.collabWith.pull(...removeAuthors);

    story = await story.save();

    res.json({
      status: 'ok',
      story,
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
        addAuthors: yup
          .array()
          .label('addAuthors')
          .when('removeAuthors', {
            is: (removeAuthors: any) => !removeAuthors,
            then: yup
              .array()
              .required('Add Authors with is required')
              .typeError('It must be valid author ID array')
              .label('addAuthors')
              .min(1)
              .of(
                yup
                  .string()
                  .label('addAuthors')
                  .typeError('It must be valid author ID')
                  .test(
                    'addAuthors',
                    'It must be valid author id',
                    (val: any) => typeOf(val, 'mongoId')
                  )
              ),
          }),
        removeAuthors: yup.array().when('addAuthors', {
          is: (addAuthors: any) => {
            return !addAuthors;
          },
          then: yup
            .array()
            .required('REmove Authors is required')
            .typeError('It must be valid author ID array')
            .label('removeAuthors')
            .min(1)
            .of(
              yup
                .string()
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
