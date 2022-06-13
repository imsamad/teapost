import { NextFunction, Request, Response } from 'express';

import pagination from '../../lib/pagination';

import { asyncHandler } from '../../lib/utils';
import Story from '../../models/Story';

// @desc      Get all stories
// @route     GGET /api/v1/story
// @access    Public

const getAllStoriesTemp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let queryClone: any = JSON.stringify({
      ...req.query,
      isPublished: true,
      isPublishedByAdmin: true,
      hadEmailedToFollowers: true,
    });

    queryClone = queryClone.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match: any) => `$${match}`
    );

    queryClone = JSON.parse(queryClone);

    Object.keys(queryClone).forEach((key) => {
      let temp: any = queryClone[key]?.$in;
      if (temp) {
        delete queryClone[key];
        if (typeof temp == 'string') queryClone[key] = { $in: temp.split(',') };
      }
    });

    const regExFields = ['title', 'subtitle', 'content', 'keywords'];

    regExFields.forEach((field) => {
      if (queryClone[field]) {
        queryClone.$or = queryClone.$or ?? [];
        queryClone.$or.push({
          [field]: new RegExp(`${queryClone[field]}`, 'gi'),
        });
      }
      delete queryClone[field];
    });

    const queryRef = Story.find(queryClone)
      .select('-content -collabWith')
      .populate([
        {
          path: 'author',
          select: 'username email fullName',
        },
        {
          path: 'tags',
          select: 'title',
        },
      ]);

    if (typeof queryClone.select == 'string')
      queryRef.select(queryClone.select.split(',').join(' '));

    delete queryClone.select;

    pagination(req, res, next, {
      query: queryRef,
      label: 'stories',
    });
  }
);

export default getAllStoriesTemp;
