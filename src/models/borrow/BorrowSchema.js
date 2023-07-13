import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
  bookID: { type: mongoose.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  bookName: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  returnDate: {
    type: Date,
    default: null,
  },

  dueDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Borrow', borrowSchema);
