import express from 'express';
import mongoose from 'mongoose';
import config from "./config";
import usersRouter from "./routes/users";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('we r online ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected');
  });
};

void run();