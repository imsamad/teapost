import express, { Router } from 'express';
import { uploadAssets, getMyAssets } from '../controller/assetCtrl';

import { protect } from '../middleware/auth';

const router: Router = express();

router.route(['/upload', '/']).post(
  protect,
  //  validateSchema(uploadAssetsSchema),
  uploadAssets
);

router.route(['/', '/my']).get(protect, getMyAssets);

export default router;
