import express from 'express';
import { addBorrow } from '../models/borrow/BorrowModel.js';
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

export default router;
