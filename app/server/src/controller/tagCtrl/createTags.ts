import { Request, Response, NextFunction } from 'express';
import { asyncHandler, trimInside, typeOf } from '../../lib/utils';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import Tag from '../../models/Tag';
const createTags = asyncHandler(async (req: Request, res: Response) => {
  const titles = await Tag.create(
    req.body.titles.map((title: string) => ({ title }))
  );

  return res.status(200).json({
    success: 200,
    titles,
  });
});

const schema = yup.object().shape({
  body: yup.object().shape({
    titles: yup
      .array()
      .of(
        yup
          .string()
          .label('titles')
          .test('titles', 'titles items must have atleast 3 char', (val: any) =>
            trimInside(val, 3)
          )
      )
      .min(1)
      .required()
      .label('titles')
      .typeError('titles must be array of tag'),
  }),
});
export default [validateSchemaMdlwr(schema), createTags];
