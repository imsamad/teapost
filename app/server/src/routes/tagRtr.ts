import express, { Router } from 'express';
import { getAllTags } from '../controller/tagCtrl';

const router: Router = express();

router.route('/').get(getAllTags);

export default router;
