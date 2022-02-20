import express, { Router } from 'express';

import {
  changeSlug,
  createOrUpdateStory,
  handleTags,
} from '../controller/storyCtrl';
import { protect } from '../middleware/auth';
import checkTemp from '../middleware/checkTemp';
import validateSchema from '../middleware/validateSchema';
import { changeSlugSchema, createStorySchema } from '../schema/story';

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

// router.post('/image', imageUpload);

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
