import { getUserById } from '../models/user/UserModel.js';

export const auth = async (req, res, next) => {
  // let go to next router or stop here and respond to client

  try {
    // Make sure every request has a flag i.e. userID
    // Get the user from DB
    // Check role
    const { authorization } = req.headers;

    const user = await getUserById(authorization);
    if (user?._id) {
      // Check the role
      user.password = undefined;
      req.userInfo = user;

      // Let go to the next router
      return next();
    }

    res.json({
      status: 'error',
      message: 'Sorry, you do not have permission to this api.',
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'error',
      message: error.message,
    });
  }
};

export const isAdminAuth = async (req, res, next) => {
  // let go to next router or stop here and respond to client

  try {
    // Make sure every request has a flag i.e. userID
    // Get the user from DB
    // Check role
    const { role } = req.userInfo;
    console.log(role);

    role === 'admin'
      ? next()
      : res.json({
          status: 'error',
          message: 'Only admins are allowed for this action.',
        });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'error',
      message: error.message,
    });
  }
};
