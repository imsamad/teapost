import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Story from '../../models/Story';
import StoryHistory from '../../models/StoryHistory';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import * as yup from 'yup';

// @desc      getStoryHistoryById
// @route     GET /api/v1/storyhistories/:storyId/:historyId
// @access    Auth,Admin,Public

export const getStoryHistoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findById(req.params.storyId);

    // @ts-ignore
    if (!storyExist || storyExist.author.toString() != req.user._id)
      return next(ErrorResponse(400, 'No resource found'));

    let storyHistory = await StoryHistory.findById(req.params.storyId);

    res.send({
      status: 'ok',
      storyHistory: storyHistory
        ? storyHistory
            .toJSON()
            .instances.filter(
              (instance: any) => instance._id == req.params.historyId
            )
        : {},
    });
  }
);
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

export default [validateSchemaMdlwr(scehma), getStoryHistoryById];
