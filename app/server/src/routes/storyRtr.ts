import express, { Router } from 'express';

import {
  changeSlug,
  createOrUpdateStory,
  handleTags,
  publishedStory,
} from '../controller/storyCtrl';

import { protect } from '../middleware/auth';
import validateSchema from '../middleware/validateSchema';
import {
  changeSlugSchema,
  createStorySchema,
  publishedStorySchema,
} from '../schema/story';

const router: Router = express();

router
  .route('/')
  .post(
    protect,
    validateSchema(createStorySchema, true),
    handleTags,
    createOrUpdateStory
  );

router
  .route('/changeslug')
  .put(protect, validateSchema(changeSlugSchema), changeSlug);

router
  .route('/published/:storyId')
  .put(protect, validateSchema(publishedStorySchema), publishedStory);

export default router;
/*
   (req: Request, _res: Response, next: NextFunction) => {
    console.log(
      'req.body.isPublishedreq.body.isPublished ',
      req.body.isPublished
    ); // @ts-ignore
    req.__YUP_SCHEMA__ = req.body.isPublished
      ? isAbleToPublished
      : createStorySchema;
    next();
  },
 */
