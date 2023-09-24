import userSchema from "./userSchema.js";

export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};

export const createUser = (userData) => {
  return userSchema(userData).save();
};

export const getUserId = (userId) => {
  return userSchema.findById(userId);
};
