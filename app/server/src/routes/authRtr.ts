import express, { Router } from "express";
const router: Router = express();

import {
  logIn,
  register,
  verifyEmail,
  getMe,
  followAuthor,
} from "../controller/authCtrl";
import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import { followSchema, logInSchema, registerSchema } from "../schema/auth";

router.post("/login", validateSchema(logInSchema), logIn);
router.post("/register", validateSchema(registerSchema), register);
router.get("/verifyemail", verifyEmail);
router.get("/me", protect, getMe);

router
  .route("/follow/undo/:authorId")
  .put(protect, validateSchema(followSchema), followAuthor(false));

router
  .route("/follow/:authorId")
  .put(protect, validateSchema(followSchema), followAuthor(true));

export default router;
