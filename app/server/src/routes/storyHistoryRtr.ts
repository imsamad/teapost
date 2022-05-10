import express, { Router } from 'express';
const router: Router = express();

import ctrl from '../controller/storyHistoryCtrl';

import { protect } from '../middleware/auth';

router.use(protect);

router
  .route('/:storyId/:historyId')
  .get(ctrl.getStoryHistoryById)
  .delete(
    ctrl.deleteStoryHistoryById.schema,
    ctrl.deleteStoryHistoryById.ctrl({ isAll: false })
  );

router
  .route('/:storyId')
  .get(ctrl.getStoryHistory)
  .delete(ctrl.deleteStoryHistoryById.ctrl({ isAll: true }));

export default router;
