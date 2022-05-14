import { Request, Response } from 'express';

const pagination = async (
  req: Request,
  res: Response,
  { query, label }: { query: any; label: string }
) => {
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

  res.json({
    pagination,
    [label]: data,
  });
};
export default pagination;
