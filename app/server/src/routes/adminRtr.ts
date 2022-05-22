import express, { Router } from 'express';
import adminCtrl from '../controller/adminCtrl';
import { authorise, protect } from '../middleware/auth';

const router: Router = express();

router.use(protect, authorise(['admin']));

router.get(['/giveMeData', '/'], adminCtrl.giveMeData);

router
  .route(['/block', '/unblock', '/blockusers', '/unblockusers'])
  .put(adminCtrl.blockUnBlockUsers);

router
  .route(['/publish', '/unpublish', '/publishstories', '/unpublishstories'])
  .put(adminCtrl.publishUnPublishStories);

export default router;
