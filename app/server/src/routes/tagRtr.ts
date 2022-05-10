import express, { Router } from 'express';
import tagCtrl from '../controller/tagCtrl';

const router: Router = express();

router.route('/').get(tagCtrl.getAllTags).post(tagCtrl.createTags);

export default router;
