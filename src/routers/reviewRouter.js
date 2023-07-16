import express from 'express';
import { auth, isAdminAuth } from '../middlewares/authMiddleware.js';
import {
  addReview,
  getReviews,
  updateReview,
} from '../models/reviews/ReviewModel.js';
import { updateBorrow } from '../models/borrow/BorrowModel.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    console.log(req.body);
    const result = await addReview(req.body);
    if (result?._id) {
      // Update borrow history
      await updateBorrow(req.body.borrowHistoryID, {
        isReviewGiven: result?._id,
      });
      return res.json({
        status: 'success',
        message: 'Your review has been succesfully received.',
      });
    }
    res.json({
      status: 'error',
      message: 'Unable to receive your review. Please try again later.',
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
    const reviews = await getReviews();
    res.json({
      status: 'success',
      message: 'Here are the reviews.',
      reviews,
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

router.patch('/', auth, isAdminAuth, async (req, res) => {
  try {
    const { _id, status } = req.body;
    const result = await updateReview(_id, { status });

    result?._id
      ? res.json({
          status: 'success',
          message: 'The status has been updated.',
        })
      : res.json({
          status: 'error',
          message: 'Unable to update review status',
        });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
