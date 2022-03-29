import express, { Router } from "express";
const router: Router = express();

import {
  logIn,
  register,
  verifyEmail,
  getMe,
  followAuthor,
  addToCollection,
  forgotPassword,
  resetPaswordPage,
  resetPasword,
} from "../controller/authCtrl";

import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  addToCollectionSchema,
  followSchema,
  logInSchema,
  registerSchema,
} from "../lib/schema/auth";

router.post("/login", validateSchema(logInSchema), logIn);
router.post("/register", validateSchema(registerSchema), register);
router.get("/verifyemail/:token", verifyEmail);
router.post("/forgotpassword", forgotPassword);

router
  .route("/resetpassword/:resettoken")
  .get(resetPaswordPage)
  .put(resetPasword);

router.use(protect);
router.get("/me", getMe);

router
  .route("/unfollow/:authorId")
  .put(validateSchema(followSchema), followAuthor(false));

router
  .route("/follow/:authorId")
  .put(validateSchema(followSchema), followAuthor(true));

router
  .route("/collection/add/:storyId")
  .put(validateSchema(addToCollectionSchema), addToCollection);

export default router;
