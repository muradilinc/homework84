import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Task from './models/Task';
import crypto from 'crypto';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (error) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['users', 'tasks'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [muradil, godjo] = await User.create(
    {
      username: 'muradil',
      password: 'satoru',
      token: crypto.randomUUID(),
    },
    {
      username: 'godjo',
      password: 'satoru',
      token: crypto.randomUUID(),
    },
  );

  await Task.create({
    user: muradil._id,
    title: 'Task 1',
    description: 'task for Muradil',
  });

  await Task.create({
    user: muradil._id,
    title: 'Task 2',
    description: 'task 2 for Muradil',
  });

  await Task.create({
    user: godjo._id,
    title: 'Task 1',
    description: 'task for Godjo',
  });

  await db.close();
};

void run();
