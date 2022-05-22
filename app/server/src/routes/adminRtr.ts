import express, { Router } from 'express';
import adminCtrl from '../controller/adminCtrl';
import { authorise, protect } from '../middleware/auth';

const router: Router = express();

router.use(protect, authorise(['admin']));

router.route(['/block', '/unblock']).put(adminCtrl.blockUnBlockUsers);

export default router;
