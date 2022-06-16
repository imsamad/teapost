import { NextFunction, Request, Response } from 'express';
import { asyncHandler, typeOf } from '../../lib/utils';
import Secondary from '../../models/Comment/Secondary';

import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import pagination from '../../lib/pagination';
// @desc      Get comments reply of primary
// @route     GET /api/v1/comments/secondaries/:primaryId
// @access    Public

const getSecondaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = Secondary.find({
      primary: req.params.primaryId,
    })
      .populate([
        { path: 'meta' },
        {
          path: 'user',
          select: 'email username',
        },
        {
          path: 'secondaryUser',
          select: 'username email',
        },
      ])
      .sort('createdAt');
    pagination(req, res, next,{ query, label: 'comments' });
  }
);
export const schema = yup.object({
  params: yup.object({
    primaryId: yup
      .string()
      .label('primaryId')
      .typeError('primaryId must be valid.')
      .required()
      .test('primaryId', 'primaryId must be valid.', (val: any) =>
        typeOf(val, 'mongoId')
      ),
  }),
});
export default [validateSchemaMdlwr(schema), getSecondaries];
