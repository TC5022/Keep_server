import User from "../models/user.js";

export const fetchNotes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('notes');
    res.status(200).json(user.notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
