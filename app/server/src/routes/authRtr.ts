import express, { Router } from "express";
const router: Router = express();

import {
  logIn,
  register,
  verifyEmail,
  getMe,
  followAuthor,
  addToCollection,
} from "../controller/authCtrl";
import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  addToCollectionSchema,
  followSchema,
  logInSchema,
  registerSchema,
} from "../schema/auth";

router.post("/login", validateSchema(logInSchema), logIn);
router.post("/register", validateSchema(registerSchema), register);
router.get("/verifyemail", verifyEmail);
router.get("/me", protect, getMe);

router
  .route("/unfollow/:authorId")
  .put(protect, validateSchema(followSchema), followAuthor(false));

router
  .route("/follow/:authorId")
  .put(protect, validateSchema(followSchema), followAuthor(true));

router
  .route("/collection/add/:storyId")
  .put(protect, validateSchema(addToCollectionSchema), addToCollection);

export default router;
