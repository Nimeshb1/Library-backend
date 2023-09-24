import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      return console.log("Mongo Url is not defined");
    }

    const conn = await mongoose.connect(process.env.MONGO_URL);

    conn ? console.log("Mongo Connected") : console.log("unable to connect");
  } catch (error) {
    console.log(error.message);
  }
};
