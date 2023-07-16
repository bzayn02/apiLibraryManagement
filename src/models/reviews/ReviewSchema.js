import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    borrowHistoryID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    bookID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    bookName: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Review', reviewSchema);
