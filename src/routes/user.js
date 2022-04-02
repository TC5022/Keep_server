import express from "express";
import { user, profile } from "../controllers/user.js";

const router = express.Router();

router.get("/", user);
router.get("/profile", profile);

export default router;
