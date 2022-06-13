import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from './utils';

const pagination = async (
  req: Request,
  res: Response,
  next: NextFunction,
  {
    query,
    label,
    cbOnData,
  }: { query: any; label: string; cbOnData?: (doc: any) => {} }
) => {
  try {
    const queryClone = query.clone();
    const totalRecords = await queryClone.countDocuments();
    // @ts-ignore
    let pageNo = parseInt(req.query.page || 1, 10) || 1,
      // @ts-ignore
      limit = parseInt(req.query.limit || 10, 10) || 10;

    pageNo <= 0 && (pageNo = 1);
    limit <= 0 && (limit = 10);

    const totalPages = Math.ceil(totalRecords / limit);

    const endIndex = limit * pageNo;
    if (pageNo > totalPages) {
      return res.json({
        pagination: {
          overflow: true,
          totalPages,
          totalRecords,
          limit,
        },
        [label]: [],
      });
    }
    const skip = (pageNo - 1) * limit;

    const data = await query.skip(skip).limit(limit);

    const pagination: any = {
      totalRecords,
      totalPages,

      limit: limit,
    };
    endIndex < totalRecords && (pagination.next = pageNo + 1);
    pageNo > 1 && (pagination.prev = pageNo - 1);

    return res.json({
      pagination,
      [label]: cbOnData ? cbOnData(data) : data,
    });
  } catch (err) {
    console.log('err ', err);
    next(err);
    // next(ErrorResponse(404, 'Please, Format the query properly.'));
  }
};
export default pagination;
