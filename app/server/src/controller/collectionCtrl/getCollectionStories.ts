import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../lib/utils';
import StoryCollection from '../../models/StoryCollection';
import { peelUserDoc } from '../../models/User';

// @desc      getCollectionStories
// @route     GET /api/v1/collections/:collectionId
// @access    Auth

const getCollectionStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;

    // @ts-ignore
    const page = parseInt(req.query.page) || 1,
      // @ts-ignore
      limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit,
      endIndex = page * limit;

    const mycollections = await StoryCollection.findOne(
      { _id: req.params.collectionId, user },
      { stories: { $slice: [startIndex, endIndex] } }
    ).populate([
      {
        path: 'stories',
        select: '-content',
        populate: { path: 'author', transform: (v) => peelUserDoc(v) },
      },
    ]);

    let pagination: any = { limit };

    if (mycollections?.stories.length) pagination.next = page + 1;

    if (startIndex > 0) pagination.prev = page - 1;

    res.json({
      pagination,
      status: 'ok',
      stories: mycollections?.stories || [],
    });
  }
);

export default getCollectionStories;
