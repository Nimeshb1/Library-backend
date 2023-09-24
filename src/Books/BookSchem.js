import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    yearpublish: {
      type: String,
      required: true,
    },

    borrowBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
