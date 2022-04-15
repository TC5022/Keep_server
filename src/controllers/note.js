import Note from "../models/note.js";
import User from "../models/user.js";

export const createNote = async (req, res) => {
  const { title, content, imageSrc, color, labels } = req.body;
  const userId = req.userId;
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
    user.notes.splice(0, 0, newNote);
    user.save();
    res.status(200).json({ message: "Note saved", note: newNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const copyNote = async (req, res) => {
  const noteId = req.body.noteId;
  const userId = req.userId;
  // console.log(noteId);
  // console.log(req.body);
  try {
    let user = await User.findById(userId);
    let note = await Note.findById(noteId);
    let newNote = note;
    console.log(newNote);
    delete newNote._id;
    const finalNote = new Note(newNote);
    console.log('final', finalNote);
    await finalNote.save();
    user.notes.splice(0, 0, newNote);
    user.save();
    res.status(200).json({ message: "Note copied", note: finalNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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