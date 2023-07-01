import express from 'express';
import {
  createUser,
  getUser,
  getUserByEmail,
} from '../models/user/UserModel.js';
import { comparePassword, hashPassword } from '../util/bcrypt.js';

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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await getUserByEmail(email);

    if (userData?._id) {
      const isMatch = comparePassword(password, userData.password);
      if (isMatch) {
        userData.password = undefined;
        return res.json({
          status: 'success',
          message: 'Login successful.',
          userData,
        });
      }
    }
    res.json({
      status: 'error',
      message: 'Invalid credentials.',
    });
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
});

export default router;
