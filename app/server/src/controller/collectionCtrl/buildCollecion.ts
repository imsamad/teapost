import { Request, Response, NextFunction } from 'express';

import { asyncHandler, typeOf } from '../../lib/utils';
import { ErrorResponse } from '../../lib/utils';
import Story from '../../models/Story';
import StoryCollection from '../../models/StoryCollection';
import * as yup from 'yup';
import { isValidObjectId } from 'mongoose';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      buildCollecion
// @route     PUT /api/v1/collection/buildCollecion/:storyId
// @access    Auth
/*
  {
    storyId: 'stirng',
    addTo: [''],
    removeFrom: [''],
    addToDefault: true,
    removeFromDefault: true,
  },

*/
const buildCollecion = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    const { addToDefault, removeFromDefault, addTo, removeFrom, storyId } =
      req.body;

    const story = await Story.findById(storyId);
    if (!story) return next(ErrorResponse(400, 'No resource found'));

    let updatePromise: any = [];
    if (addToDefault || removeFromDefault) {
      updatePromise.push(
        StoryCollection.findOneAndUpdate(
          {
            user,
            title: new RegExp('^' + 'read later' + '$', 'i'),
          },
          addToDefault
            ? { user, $addToSet: { stories: story._id } }
            : { user, $pull: { stories: story._id } },
          {
            new: true,
            upsert: true,
          }
        )
      );
    }
    if (addTo) {
      addTo.forEach((collId: string) => {
        updatePromise.push(
          StoryCollection.findOneAndUpdate(
            { _id: collId, user },
            { _id: collId, user, $push: { stories: story._id } },
            { new: true, upsert: true }
          )
        );
      });
    }
    if (removeFrom) {
      removeFrom.forEach((collId: string) => {
        updatePromise.push(
          StoryCollection.findOneAndUpdate(
            { _id: collId, user },
            {
              _id: collId,
              user,
              $pull: { stories: story._id },
            },
            { new: true, upsert: true }
          )
        );
      });
    }

    Promise.allSettled(updatePromise)
      .then((upRes) => {
        //   Send back all collections
      })
      .catch((err: any) => {})
      .finally(() => {
        res.json({ status: 'ok' });
      });
  }
);

export const schema = yup.object({
  body: yup
    .object()
    .shape({
      storyId: yup
        .string()
        .label('storyId')
        .test('storyId', 'Story ID must be valid id.', (val: any) =>
          isValidObjectId(val)
        )
        .typeError('Story Id must be of type')
        .required(),
      //   strSchema('storyId', {
      //   isRequired: true,
      //   isMongoId: true,
      //   prettyLabel: 'Story Id',
      // }),
      addTo: yup
        .array()
        .of(
          yup
            .string()
            .label('addTo')
            .test('addTo', 'addTo must be valid id.', (val: any) =>
              isValidObjectId(val)
            )
            .typeError('addTo collection must be valid mongoose id')
        )
        .typeError('addTo must be of array of valid collectionId array'),
      removeFrom: yup
        .array()
        .of(
          yup
            .string()
            .label('removeFrom')
            .test('removeFrom', 'removeFrom must be valid id.', (val: any) =>
              isValidObjectId(val)
            )
            .typeError('removeFrom collection must be valid mongoose id')
        )
        .typeError('removeFrom must be of array of valid collectionId array'),
      addToDefault: yup
        .boolean()
        .label('addToDefault')
        .typeError('Express addToDefault in boolean'),
      removeFromDefault: yup
        .boolean()
        .label('removeFromDefault')
        .typeError('Express removeFromDefault in boolean'),
    })
    .label('body')
    .test(
      'body',
      'Provide valid & unique addTo & removeFrom collectionId ',
      (val: any) => {
        if (
          val?.addTo &&
          val?.removeFrom &&
          val?.addToDefault &&
          val?.removeFromDefault
        )
          return false;

        let addToISArray = typeOf(val?.addTo, 'array'),
          removeFromIsArray = typeOf(val?.removeFrom, 'array');

        if (addToISArray && removeFromIsArray) {
          const total = [...val.removeFrom, ...val.addTo];
          return new Set(total).size === total?.length;
        }
        return true;
      }
    ),
});
export default [validateSchemaMdlwr(schema), buildCollecion];
