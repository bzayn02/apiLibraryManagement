import UserSchema from './UserSchema.js';

export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUser = () => {
  return UserSchema.find();
};

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};
