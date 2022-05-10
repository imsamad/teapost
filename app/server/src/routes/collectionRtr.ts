import express, { Router } from 'express';
const router: Router = express();

import * as collectionCtrl from '../controller/collectionCtrl';
import { protect } from '../middleware/auth';

router.use(protect);

router.post('/', collectionCtrl.createCollection);

router.get(['/my', '/'], collectionCtrl.myCollections);

router.get('/stories/:collectionId', collectionCtrl.getCollectionStories);

router.patch('/build', collectionCtrl.buildCollecion);

router
  .route('/:collectionId')
  .put(collectionCtrl.updateCollection)
  .delete(collectionCtrl.removeCollection);

export default router;
