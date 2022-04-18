import Note from "../models/note.js";
import Label from "../models/label.js";
import User from "../models/user.js";

export const getNotes = async (req, res) => {
  const {labelId} = req.body;

  try {
    const label = Label.findById(labelId).populate("notes");
    const notes = label.notes;
    res.status(200).json({ message: "Fetched Successfully", notes: notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createLabel = async (req, res) => {
  const { noteId, labelName } = req.body;
  const userId = req.userId;
  var notes = new Array();
  notes.push(noteId);

  try {
      const newLabel = new Label({name: labelName, notes: notes});
      await newLabel.save();
      const note = await Note.findById(
        noteId)
      note.labels.push(newLabel);
      await note.save();
      const user = await User.findById(
        userId
      );
      user.labels.push(newLabel);
      await user.save();

      res.status(200).json({message: 'Label created', label: newLabel, note: note});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeLabelFromNote = async (req, res) => {
  const {noteId, labelId} = req.body;

  try {
    const note = Note.findByIdAndUpdate(
      noteId,
      { $pull: { labels: labelId } },
      { new: true }
    );

    Label.findByIdAndUpdate(labelId, {$pull: {notes: noteId}});

    res.status(200).json({message: 'Label removed from the note', note: note});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
