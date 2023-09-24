import transactionSchema from "./transactionSchema.js";

export const postTransactions = (obj) => {
  return transactionSchema(obj).save();
};

export const getAllTransaction = () => {
  return transactionSchema.find();
};

export const findTransactionById = (_id) => {
  return transactionSchema.findById(_id);
};

export const findTransactionAndUpdate = (userId, isbn) => {
  return transactionSchema.findOne({
    "borrowBy.userId": { $in: userId },
    "borrowsBooks.isbn": { $in: isbn },
  }); 
};

export const updateTransaction = (_id, obj) => {
  return transactionSchema.findByIdAndUpdate(_id, obj, { new: true });
};
