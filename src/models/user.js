import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    archives: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    labels: { type: Array, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;