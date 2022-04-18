import Label from "../models/label.js";
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
  try {
    let user = await User.findById(userId);
    let note = await Note.findById(noteId);
    const {title, content, imageSrc, color, labels} = note;
    const finalNote = new Note({
      title,
      content,
      imageSrc,
      color,
      labels,
      userId: userId,
    });
    await finalNote.save();

    user.notes.splice(0, 0, finalNote);
    user.save();

    res.status(200).json({ message: "Note copied", note: finalNote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editNote = async (req, res) => {
  const { noteId } = req.body;
  const query = req.params.query;

  try {
    let note;
    if (query == "edit") {

      const { title, content } = req.body;
      note = await Note.findByIdAndUpdate(
        noteId,
        { title: title, content: content },
        { new: true }
      ).populate({ path: "labels", select: ["_id", "name"] });

    } else if (query == "color") {

      const { color } = req.body;
      note = await Note.findByIdAndUpdate(
        noteId,
        { color: color },
        { new: true }
      ).populate({ path: "labels", select: ["_id", "name"] });

    } else if (query == "image") {

      const { imageSrc } = req.body;
      note = await Note.findByIdAndUpdate(
        noteId,
        { $push: { imageSrc: imageSrc } },
        { new: true }
      ).populate({ path: "labels", select: ["_id", "name"] });

    } else if (query == "archive") {
       note = await Note.findByIdAndUpdate(
         noteId,
         { archive: true },
         { new: true }
       ).populate({ path: "labels", select: ["_id", "name"] });

    } else if (query == "unarchive") {
       note = await Note.findByIdAndUpdate(
         noteId,
         { archive: false },
         { new: true }
       ).populate({ path: "labels", select: ["_id", "name"] });
       
    }

    res.status(200).json({ message: "Note Updated successfully", note: note });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteNote = async (req, res) => {
  const noteId = req.body.noteId;
  try {
    let note = await Note.findById(noteId);
    let userId = req.userId;

    for (let a = 0; a < note.labels.length; a++) {
      await Label.findByIdAndUpdate(note.labels[a], {
        $pull: { notes: noteId },
      });
    }

    note.remove();
    await User.findByIdAndUpdate(userId, { $pull: { notes: noteId } });
    res.status(200).json({ message: "Note deleted", success: true, labels: note.labels });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
