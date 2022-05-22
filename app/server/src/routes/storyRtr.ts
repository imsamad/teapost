import express, { Router } from 'express';
const router: Router = express();

import * as storyCtrl from '../controller/storyCtrl';
import { fetchAuth, protect } from '../middleware/auth';

router.get('/iamcollabing', protect, storyCtrl.iamcollabing);
router.get('/my', protect, storyCtrl.myStories);

router.route('/').get(storyCtrl.getAllStories);

router.use(fetchAuth);

router.get('/:storyId', storyCtrl.getStoryById);

router.use(protect);

router.patch(
  ['/publishedmany', '/unpublishedmany'],
  storyCtrl.publishedMultipleStories
);

router.patch(
  ['/published/:storyId', '/unpublished/:storyId'],
  storyCtrl.publishedStory
);

router.patch('/grade/:storyId', storyCtrl.gradeStory);

// router.put('/uncollabme', storyCtrl.unCollabMeMultiple);
router.put('/uncollabme', storyCtrl.unCollabMe);

router.put('/collab/:storyId', storyCtrl.collab);
router.post(['/initialize', '/init'], storyCtrl.initializeStory);

router.delete('/deletemany', storyCtrl.deleteMultipleStories);

router
  .route('/:storyId')
  .delete(storyCtrl.deleteStory)
  .put(storyCtrl.updateStory);

export default router;
