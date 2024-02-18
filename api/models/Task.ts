import mongoose from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: mongoose.Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User not exist!',
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['new', 'in_progress', 'complete'],
    default: 'new',
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;