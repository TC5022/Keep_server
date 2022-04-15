import express from "express";
import { copyNote, createNote } from "../controllers/note.js";
import { auth } from "../middleware/auth.js";

const noteRouter = express.Router();

noteRouter.post("/create", auth, createNote);
noteRouter.post("/copy", auth, copyNote);

export default noteRouter;
