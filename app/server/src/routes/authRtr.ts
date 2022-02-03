import express, { Router } from 'express';
const router: Router = express();

import { signin, register } from '../controller/authCtrl';
import validateSchema from '../middleware/validateSchema';
import { registerSchema } from '../schema/auth';

router.post('/signin', signin);
router.post('/register', validateSchema(registerSchema), register);

export default router;
