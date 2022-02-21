import express, { Router } from 'express';
import { imageUpload } from '../controller/imageUploadCtrl';
import validateSchema from '../middleware/validateSchema';
import { imageUploadSchema } from '../schema/imageUpload';
import { protect } from '../middleware/auth';
const router: Router = express();

router
  .route('/upload')
  .post(protect, validateSchema(imageUploadSchema), imageUpload);

export default router;
