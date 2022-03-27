import express, { Router } from "express";
import { getAllUsers } from "../controller/userCtrl";

const router: Router = express();

router.route("/").get(getAllUsers);

export default router;
