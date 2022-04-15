import express from "express";
import { createNote } from "../controllers/note.js";
import { auth } from "../middleware/auth.js";

const noteRouter = express.Router();

noteRouter.post("/", auth, createNote);

export default noteRouter;
