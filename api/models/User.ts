import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { UserFields, UserMethods, UserModel } from '../types';
import { SALT_WORK_FACTOR } from '../constants/constants';

const Schema = mongoose.Schema;

const userSchema = new Schema<UserFields, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

userSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<UserFields, UserModel>('User', userSchema);
export default User;
