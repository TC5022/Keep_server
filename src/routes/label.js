import express from "express";
import { fetchLabels } from "../controllers/home.js";
import { createLabel, getNotes, removeLabelFromNote } from "../controllers/label.js";
import { auth } from "../middleware/auth.js";

const labelRouter = express.Router();

labelRouter.post('/create', auth, createLabel);
labelRouter.post('/remove', auth, removeLabelFromNote);
labelRouter.get('/fetchNotes', auth, getNotes);
labelRouter.get('/', auth, fetchLabels);

export default labelRouter;
