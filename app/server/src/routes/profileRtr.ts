import express, { Router } from "express";
import { getProfile } from "../controller/profileCtrl";
const router: Router = express();
import { protect } from "../middleware/auth";

router.route("/:userId").get(protect, getProfile);

export default router;
