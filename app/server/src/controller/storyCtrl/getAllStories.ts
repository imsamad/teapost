import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import pagination from '../../lib/pagination';

import { asyncHandler, typeOf } from '../../lib/utils';
import Story from '../../models/Story';
import { peelUserDoc } from '../../models/User';

// @desc      Get all stories
// @route     GGET /api/v1/story
// @access    Public
const getAllStories = asyncHandler(async (req: Request, res: Response) => {
  let replace = [
    ['likes', 'noOfLikes'],
    ['dislikes', 'noOfDislikes'],
    ['views', 'noOfViews'],
    ['comments', 'noOfComments'],
    ['tag', 'tags'],
    ['authors', 'author'],
    // ['id', '_id'],
  ];

  const id = req.query.id || req.query._id;
  let queryClone = JSON.stringify(req.query);
  let query: any = {};
  if (id) {
    queryClone = JSON.stringify({});
    query._id = id;
  }

  queryClone = queryClone.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  replace.forEach((repl) => {
    queryClone = queryClone.replace(
      new RegExp(repl[0]),
      (match) => `${repl[1]}`
    );
  });
  queryClone = JSON.parse(queryClone);

  const searchable = {
    title: 'RegEx',
    subtitle: 'RegEx',
    keywords: 'RegEx',
    content: 'RegEx',

    slug: 'string',

    tags: 'mongoId',
    author: 'mongoId',
    collabWith: 'mongoId',
    // _id: 'mongoId',

    readingTime: 'operator',
    noOfLikes: 'operator',
    noOfDislikes: 'operator',
    noOfViews: 'operator',
    noOfComments: 'operator',
  };
  const types = {
    operator: [
      'readingTime',
      'noOfLikes',
      'noOfDislikes',
      'noOfViews',
      'noOfComments',
    ],
    mongoId: ['tags', 'author', 'collabWith'],
    regEx: ['title', 'subtitle', 'content', 'keywords'],
    string: ['slug'],
  };
  Object.keys(queryClone).forEach((field) => {
    if (!(field in searchable)) return;
    // @ts-ignore
    const fieldValue: any = queryClone[field];
    const isStr = typeOf(fieldValue, 'string');
    // @ts-ignore
    const type = searchable[field];

    switch (type) {
      case 'RegEx':
        if (!isStr) break;
        query.$or = query.$or ?? [];
        query.$or.push({ [field]: new RegExp(`${fieldValue}`, 'gi') });
        break;
      case 'string':
        if (!isStr) break;
        query[field] = fieldValue;
        break;
      case 'mongoId':
        if (isStr) {
          const ids = fieldValue
            .split(',')
            .filter((id: any) => isValidObjectId(id));
          if (ids.length) query[field] = query[field] ?? { $in: ids };
        } else {
          for (const keys in fieldValue) {
            if (typeof fieldValue[keys] == 'string')
              fieldValue[keys] = fieldValue[keys].split(',');
            else delete fieldValue[keys];
          }
          if (Object.keys(fieldValue).length) query[field] = fieldValue;
        }
        break;
      case 'operator':
        if (isStr) {
          query[field] = fieldValue;
        } else
          for (const keys in fieldValue) {
            if (typeof fieldValue[keys] == 'string')
              fieldValue[keys] = fieldValue[keys];
            else delete fieldValue[keys];
          }

        if (Object.keys(fieldValue).length) query[field] = fieldValue;
        break;
    }
  });

  let queryRef = Story.find({
    ...query,
    isPublished: true,
    isPublishedByAdmin: true,
    hadEmailedToFollowers: true,
  });
  let populate = [
    {
      path: 'collabWith',
      transform: (v: any) => peelUserDoc(v),
    },
    {
      path: 'author',
      transform: (v: any) => peelUserDoc(v),
    },
    {
      path: 'tags',
      select: 'title',
    },
  ];
  let commentPopulate = {
    path: 'comments',
    populate: [
      {
        path: 'user',
        transform: (v: any) => peelUserDoc(v),
      },
      {
        path: 'secondary',
        populate: [
          {
            path: 'user',
            transform: (v: any) => peelUserDoc(v),
          },
          {
            path: 'secondaryUser',
            transform: (v: any) => peelUserDoc(v),
          },
        ],
      },
    ],
  };
  queryRef.populate(populate).lean();

  let populateComment =
    typeof req.query.populate == 'string'
      ? req.query.populate?.includes('comment')
      : false;
  populateComment && queryRef.populate(commentPopulate);
  let populateMeta =
    typeof req.query.populate == 'string'
      ? req.query.populate?.includes('meta')
      : false;
  populateMeta && queryRef.populate('meta');

  let selectContent =
    typeof req.query.select == 'string'
      ? req.query.select?.includes('content')
      : false;
  let selectCollabWith =
    typeof req.query.select == 'string'
      ? req.query.select?.includes('collabWith')
      : false;

  // @ts-ignore
  queryRef.select(selectContent ? 'content' : '-content');

  queryRef.select(selectCollabWith ? 'collabWith' : '-collabWith');

  pagination(req, res, {
    query: queryRef,

    label: 'stories',
  });
});

export default getAllStories;
