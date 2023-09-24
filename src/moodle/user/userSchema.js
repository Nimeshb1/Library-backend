import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    status: {
      type: String,
      default: "active",
    },

    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("Users", userSchema);
