import express, { Router } from 'express';
import { getAllUsers } from '../controller/userCtrl';
import { fetchAuth } from '../middleware/auth';

const router: Router = express();

router.route('/').get(fetchAuth, getAllUsers);

export default router;
