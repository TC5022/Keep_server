import express from "express";
import { fetchNotes } from "../controllers/home.js";
import user from "./user.js";
import noteRouter from "./note.js";

const router = express.Router();

router.get("/v1", fetchNotes);
router.use("/v1/user", user);
router.use("/v1/note", noteRouter);

export default router;