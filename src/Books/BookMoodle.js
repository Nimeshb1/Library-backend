import BookSchem from "./BookSchem.js";

export const addBooks = (bookInfo) => {
  return BookSchem(bookInfo).save();
};

export const getAllBooks = () => {
  return BookSchem.find();
};

export const deleteBooks = (_id) => {
  return BookSchem.findByIdAndDelete(_id);
};

export const getBorrowBooks = (_id) => {
  return BookSchem.findById(_id);
};

export const borrowBooksAndUpdate = (_id, obj) => {
  return BookSchem.findByIdAndUpdate(_id, obj, { new: true });
};

export const showBorrowbooks = (userId) => {
  return BookSchem.find({ borrowBy: { $in: userId } });
};
