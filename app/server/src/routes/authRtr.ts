import express, { Router } from "express";
const router: Router = express();

import {
  logIn,
  register,
  verifyEmail,
  getMe,
  followAuthor,
  forgotPassword,
  resetPaswordPage,
  resetPasword,
  changeEmail,
  updateDetails,
  forgotIdentifier,
} from "../controller/authCtrl";

import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  followSchema,
  forgotIdentifierSchema,
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

router.post(
  "/forgotidentifier",
  validateSchema(forgotIdentifierSchema),
  forgotIdentifier
);

router.use(protect);
router.get("/me", getMe);
router.put("/changeemail", protect, changeEmail);
router.put("/update", protect, updateDetails);

router
  .route("/unfollow/:authorId")
  .put(validateSchema(followSchema), followAuthor(false));

router
  .route("/follow/:authorId")
  .put(validateSchema(followSchema), followAuthor(true));

export default router;
