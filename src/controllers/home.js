import User from "../models/user.js";

export const fetchNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate({
      path: "notes",
      populate: { path: "labels", select: ['_id', 'name']},
    });
    const notes = user.notes;
    res.status(200).json({notes: notes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchLabels = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate({
      path: "labels",
      populate: {
        path: "notes",
        populate: { path: "labels", select: ["_id", "name"] },
      },
    });
    const labels = user.labels;
    res.status(200).json({ labels: labels });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
