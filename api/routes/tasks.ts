import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import Task from '../models/Task';
import mongoose from 'mongoose';

const tasksRouter = express.Router();

tasksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const task = new Task({
      user: req.user?._id,
      title: req.body.title,
      description:
        req.body.description.length !== 0 ? req.body.description : null,
      status: req.body.status,
    });
    await task.save();
    return res.send(task);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: error.message });
    }

    return next(error);
  }
});

tasksRouter.get('/', auth, async (req, res, next) => {
  try {
    const tasks = await Task.find();
    return res.send(tasks);
  } catch (error) {
    return next(error);
  }
});

tasksRouter.put('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const result = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user?._id,
      },
      {
        title: req.body.title,
        description: req.body.title,
        status: req.body.status,
      },
      { runValidators: true },
    );

    if (!result) {
      return res.status(403).json({ error: 'Доступ запрещен', status: 403 });
    }

    return res.send(result);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ error: error.message });
    }
    return next(error);
  }
});

tasksRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
  try {
    const result = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user?._id,
    });
    if (result) {
      return res.send('deleted ' + result._id);
    } else {
      return res.status(403).json({ error: 'Доступ запрещен', status: 403 });
    }
  } catch (error) {
    return next(error);
  }
});

export default tasksRouter;
