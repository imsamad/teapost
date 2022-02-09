import express, { Router } from 'express';
const router: Router = express();

import { logIn, register, verifyEmail } from '../controller/authCtrl';
import validateSchema from '../middleware/validateSchema';
import { logInSchema, registerSchema } from '../schema/auth';

router.post('/login', validateSchema(logInSchema), logIn);
router.post('/register', validateSchema(registerSchema), register);
router.get('/verifyemail', verifyEmail);
// validateSchema(verifyEmailSchema),
export default router;
