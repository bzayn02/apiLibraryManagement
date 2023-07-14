import express from 'express';
import {
  addBorrow,
  getAllBorrows,
  getBorrowByUserID,
  updateBorrow,
} from '../models/borrow/BorrowModel.js';
import { updateBook } from '../models/book/BookModel.js';

const router = express.Router();

const twoWeeks = 14;

router.post('/', async (req, res) => {
  try {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + twoWeeks);
    req.body.dueDate = dueDate;
    // Create new borrow details in db
    const result = await addBorrow(req.body);
    if (result?._id) {
      // Make book status not available and add due Date
      const update = await updateBook(req.body.bookID, {
        isAvailable: false,
        dueDate,
        returnDate: null,
      });

      if (update?._id) {
        return res.json({
          status: 'success',
          message:
            'This book has been successfully borrowed and updated in the system.',
        });
      }
    }
    res.json({
      status: 'error',
      message: 'Unable to borrow book, please try again later.',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { role, _id } = req.userInfo;
    const borrowHistory =
      role === 'admin' ? await getAllBorrows() : await getBorrowByUserID(_id);

    res.json({
      status: 'success',
      message: 'Here are the borrow lists.',
      borrowHistory,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

router.put('/', async (req, res) => {
  try {
    const { bookID, borrowID } = req.body;

    const putBorrow = await updateBorrow(borrowID, {
      dueDate: null,
      isReturned: true,
      returnDate: Date().slice(0, 10),
    });
    if (putBorrow?._id) {
      // Update borrow table
      const putBook = await updateBook(bookID, {
        dueDate: null,
        isAvailable: true,
      });
      if (putBook?._id) {
        return res.json({
          status: 'success',
          message: 'This book has been returned successfully.',
        });
      }
    }
    // Update book
    res.json({
      status: 'error',
      message:
        'Unable to udpate the system. Please contact the administration.',
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});
export default router;
