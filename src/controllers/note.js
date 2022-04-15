import Note from "../models/note.js";
import User from "../models/user.js";

export const createNote = async (req, res) => {
    const {title, content, imageSrc, color, labels} = req.body;
    const userId = req.userId
    try {
      let user = await User.findById(userId);
      const newNote = new Note({
        userId,
        title,
        content,
        imageSrc,
        color,
        labels,
      });
      await newNote.save();
      user.notes.push(newNote);
      user.save();
      res.status(200).json({ message: "Note saved", note: newNote });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.note._id, req.body);
    res.status(200).json({ message: "Note Updated successfully", note: note });
  } catch (error) {
    res.status(500).json(error);
  };
}

export const deleteNote = async (req, res) => {
  
}