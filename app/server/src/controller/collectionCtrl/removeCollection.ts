import { NextFunction, Request, Response } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import StoryCollection from '../../models/StoryCollection';

import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Delete collection
// @route     DELETE /api/v1/collection/:collectionId
// @access    Auth
const removeCollection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id.toString();
    const collection = await StoryCollection.findOneAndDelete({
      _id: req.params.collectionId,
      user,
    });
    // // // @ts-ignore
    // // if (collection?.title.toLowerCase() == "read later")
    // //   return next(ErrorResponse(402, "Read more cannot be removed"));
    // if (!collection || collection?.user.toString() != user)
    //   return next(ErrorResponse(400, "Resource not found."));
    // await collection.delete();

    return res.json({
      status: 'ok',
      message: 'Deleted',
    });
  }
);

export const removeCollectionSchema = yup.object({
  params: yup.object({
    collectionId: yup
      .string()
      .label('collectionId')
      .test('collectionId', 'collectionId must be valid ids', (val: any) => {
        return typeOf(val, 'mongoId');
      })
      .required('Specify collectiionId to remove')
      .typeError('Collection ID must be a valid id.'),
  }),
});
export default [validateSchemaMdlwr(removeCollectionSchema), removeCollection];
