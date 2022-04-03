import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageSrc: { type: Array, required: false },
    color: { type: String, required: false },
    labels: { type: Array, required: false },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
