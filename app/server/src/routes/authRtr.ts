import express, { Router } from "express";
const router: Router = express();

import { logIn, register, verifyEmail, getMe } from "../controller/authCtrl";
import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import { logInSchema, registerSchema } from "../schema/auth";

router.post("/login", validateSchema(logInSchema), logIn);
router.post("/register", validateSchema(registerSchema), register);
router.get("/verifyemail", verifyEmail);
router.get("/me", protect, getMe);

export default router;
