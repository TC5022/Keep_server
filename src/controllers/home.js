import User from "../models/user.js";

export const fetchNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("notes");
    const notes = user.notes;
    res.status(200).json({notes: notes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
