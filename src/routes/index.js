import express from "express";
import { home } from "../controllers/home.js";
import user from "./user.js";

const router = express.Router();

router.get("/", home);
router.use("/user", user);

export default router;