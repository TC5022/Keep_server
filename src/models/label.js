import mongoose from "mongoose";

const labelSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  },
  { timestamps: true }
);

const Label = mongoose.model("Label", labelSchema);

export default Label;