import express from "express";
import { fetchNotes } from "../controllers/home.js";
import user from "./user.js";
import noteRouter from "./note.js";
import { auth } from "../middleware/auth.js";
import labelRouter from "./label.js";

const router = express.Router();

router.get("/v1", auth, fetchNotes);
router.use("/v1/user", user);
router.use("/v1/note", noteRouter);
router.use("/v1/labels", labelRouter);

export default router;