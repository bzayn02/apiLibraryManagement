import UserSchema from './UserSchema.js';

export const createUser = (userObj) => {
  return UserSchema(userObj).save();
};
