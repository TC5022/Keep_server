import express from "express";
import { home } from "../controllers/home.js";
import user from "./user.js";
import noteRouter from "./note.js";

const router = express.Router();

router.get("/", home);
router.use("/user", user);
router.use("/note", noteRouter);

export default router;