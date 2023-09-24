import mongoose from "mongoose";

const transtionSchema = new mongoose.Schema(
  {
    returnDates: {
      type: Date,
    },
    borrowBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      userFname: { type: String },
      userLname: { type: String },
    },

    borrowsBooks: {
      isbn: { type: String },
      yearpublish: { type: String },
      thumbnail: { type: String },
      title: { type: String },
      author: { type: String },
      year: { type: Number },
      _id: { type: Object },
    },
  },
  { timestamps: true }
);
export default mongoose.model("transaction", transtionSchema);
