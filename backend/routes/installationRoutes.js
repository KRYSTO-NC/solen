import express from "express";
const router = express.Router();
import {getInstallations , getInstallationById} from "../controllers/installationController.js";


router.route("/").get(getInstallations);
router.route("/:id").get(getInstallationById);

export default router;
