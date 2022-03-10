import express, { Router } from "express";
import { getProfile } from "../controller/profileCtrl";
const router: Router = express();
import { authorise, protect } from "../middleware/auth";

router.route("/:userId").get(protect, authorise(["admin"]), getProfile);

export default router;
