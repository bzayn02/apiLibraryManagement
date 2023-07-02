import express from 'express';
import { addBook, getBooks } from '../models/book/BookModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await getBooks();
    res.json({
      status: 'success',
      message: 'Here are the books.',
      books,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: 'Unable to find books.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const book = await addBook(req.body);
    book?._id
      ? res.json({
          status: 'success',
          message: 'New book has been successfully added.',
        })
      : res.json({
          status: 'success',
          message: 'New book has been successfully added.',
        });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
