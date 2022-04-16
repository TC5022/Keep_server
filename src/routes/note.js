import express from "express";
import { copyNote, createNote, deleteNote, editNote } from "../controllers/note.js";
import { auth } from "../middleware/auth.js";

const noteRouter = express.Router();

noteRouter.post("/create", auth, createNote);
noteRouter.post("/copy", auth, copyNote);
noteRouter.post("/delete", auth, deleteNote);
noteRouter.post("/update/:query", auth, editNote);

export default noteRouter;
