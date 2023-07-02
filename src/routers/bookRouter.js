import express from 'express';
import {
  addBook,
  deleteBook,
  getBooks,
  updateBook,
} from '../models/book/BookModel.js';

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
          status: 'error',
          message: 'Unable to add book.',
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
    const { _v, _id, ...rest } = req.body;
    const book = await updateBook(_id, rest);
    book?._id
      ? res.json({
          status: 'success',
          message: 'Book has been successfully updated.',
        })
      : res.json({
          status: 'error',
          message: 'Unable to update book.',
        });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;

    const books = await deleteBook(_id);
    books._id
      ? res.json({
          status: 'success',
          message: 'The book has been successfully deleted.',
          books,
        })
      : res.json({
          status: 'error',
          message: 'Unable to delete books.',
        });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
