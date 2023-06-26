import express from 'express';
import { createUser, getUser } from '../models/user/UserModel.js';
import { hashPassword } from '../util/bcrypt.js';

const router = express.Router();

// fetching users
router.get('/', async (req, res) => {
  try {
    const result = await getUser();

    res.json({
      status: 'success',
      message: 'Here are the user informations.',
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      status: 'error',
      message: 'Unable to get user informations.',
    });
  }
});

// adding users
router.post('/', async (req, res) => {
  try {
    const { password } = req.body;
    const hashPass = hashPassword(password);
    req.body.password = hashPass;
    console.log(hashPass);
    const user = await createUser(req.body);
    user?._id
      ? res.json({
          status: 'success',
          message: 'User has been successfully added.',
          users: user,
        })
      : res.json({
          status: 'error',
          message: 'Unable to create new user.',
          users: user,
        });
  } catch (error) {
    let msg = error.message;
    if (msg.includes('E11000 duplicate key error collection')) {
      msg = 'Email already exists in the system. Please use another.';
    }
    res.json({
      status: 'error',
      message: msg,
    });
  }
});

// Login user

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const hashPass = hashPassword(password);
  if (hashPass === password) {
    res.json({
      status: 'success',
      message: 'Login successful.',
    });
  }
  res.json({
    status: 'error',
    message: 'Unable to login.',
  });
});

export default router;
