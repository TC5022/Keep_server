import express from "express";
import { fetchLabels } from "../controllers/home.js";
import {
  addLabelToNote,
  createLabel,
  createNoteLabel,
  deleteLabel,
  getNotes,
  removeLabelFromNote,
} from "../controllers/label.js";
import { auth } from "../middleware/auth.js";

const labelRouter = express.Router();

labelRouter.post("/create", auth, createNoteLabel);
labelRouter.post("/new", auth, createLabel);
labelRouter.post('/remove', auth, removeLabelFromNote);
labelRouter.get('/fetchNotes', auth, getNotes);
labelRouter.get('/', auth, fetchLabels);
labelRouter.post('/addLabel', auth, addLabelToNote);
labelRouter.post('/delete', auth, deleteLabel);

export default labelRouter;
