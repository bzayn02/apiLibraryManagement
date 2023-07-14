import BorrowSchema from './BorrowSchema.js';

export const addBorrow = (borrowObj) => {
  return BorrowSchema(borrowObj).save();
};

// For Admin to get all borrows
export const getAllBorrows = () => {
  return BorrowSchema.find();
};
// For user to get all borrows
export const getBorrowByUserID = (userID) => {
  return BorrowSchema.find({ userID });
};

export const updateBorrow = (_id, data) => {
  return BorrowSchema.findByIdAndUpdate(_id, data);
};

export const deleteBorrow = (_id) => {
  return BorrowSchema.findByIdAndDelete(_id);
};
