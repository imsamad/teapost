import express, { Router } from 'express';
const router: Router = express();

import { signin, register, verifyEmail } from '../controller/authCtrl';
import validateSchema from '../middleware/validateSchema';
import { registerSchema, verifyEmailSchema } from '../schema/auth';

router.post('/signin', signin);
router.post('/register', validateSchema(registerSchema), register);
router.get('/verifyemail', validateSchema(verifyEmailSchema), verifyEmail);

export default router;
