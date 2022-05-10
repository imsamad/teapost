import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Story from '../../models/Story';
import StoryHistory, { ParseDoc } from '../../models/StoryHistory';

import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import * as yup from 'yup';
// @desc      deleteStoryHistoryById
// @route     DELETE /api/v1/storyhistories/:storyId/:historyId
// @route     DELETE /api/v1/storyhistories/:storyId => Delete all
// @access    Auth,Admin

export const deleteStoryHistoryById = ({ isAll = false }) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findById(req.params.storyId);
    // @ts-ignore
    if (!storyExist || storyExist.author.toString() != req.user._id)
      return next(ErrorResponse(400, 'No resource found'));

    if (isAll) {
      await StoryHistory.findByIdAndRemove(req.params.storyId, {
        new: true,
      });
      return res.json({
        status: 'ok',
        storyhistory: null,
      });
    }
    const storyHistory = await StoryHistory.findByIdAndUpdate(
      req.params.storyId,
      {
        $pull: { instances: { _id: { $in: [req.params.historyId] } } },
      },
      {
        new: true,
      }
    );
    res.send({
      status: 'ok',
      storyHistory: storyHistory ? ParseDoc(storyHistory) : null,
    });
  });

export const scehma = yup.object({
  params: yup.object({
    storyId: yup
      .string()
      .label('storyId')
      .required('Story Id is required')
      .typeError('storyId must be a valid id')
      .test('storyId', 'Story Id must be a valid id', (val: any) =>
        typeOf(val, 'mongoId')
      ),
    historyId: yup
      .string()
      .label('historyId')
      .required('History Id is required')
      .typeError('historyId must be a valid id')
      .test('historyId', 'History Id must be a valid id', (val: any) =>
        typeOf(val, 'mongoId')
      ),
  }),
});
export default {
  ctrl: deleteStoryHistoryById,
  schema: validateSchemaMdlwr(scehma),
  arr: [validateSchemaMdlwr(scehma)],
};
