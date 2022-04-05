import express from "express";
import { createNote } from "../controllers/note.js";

const noteRouter = express.Router();

noteRouter.post("/", createNote);

export default noteRouter;
