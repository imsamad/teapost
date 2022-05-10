import express from 'express';

import ctrl from '../controller/commentCtrl';

import { protect } from '../middleware/auth';

const router = express();

router.get('/primaries/:storyId', ctrl.getPrimaries);

router.get('/secondaries/:primaryId', ctrl.getSecondaries);

router.use(protect);

router.post('/primaries/:storyId', ctrl.createPrimary);

router.post('/secondaries/reply/:secondaryId', ctrl.replyToSecondary);

router.post('/secondaries/:primaryId', ctrl.createSecondary);

router.patch(
  ['/grade/:commentId/primary', '/grade/:commentId/secondary'],
  ctrl.likeOrDislike
);

router
  .route(['/primaries/:commentId', '/secondaries/:commentId'])
  .put(ctrl.updateOrDeleteComment)
  .delete(ctrl.updateOrDeleteComment);

export default router;
