import UserSchema from './UserSchema.js';

export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};

export const getUser = () => {
  return UserSchema.find();
};
