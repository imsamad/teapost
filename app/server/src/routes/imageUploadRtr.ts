import express, { Router } from 'express';
import { imageUpload } from '../controller/imageUploadCtrl';
const router: Router = express();

router.route('/upload').post(imageUpload);

export default router;
