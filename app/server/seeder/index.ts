import * as dotenv from 'dotenv';
import path from 'path';
const setEnv = () =>
  new Promise((resolve, reject) => {
    dotenv.config({
      path: path.join(__dirname, '../', `config`, '.env'),
    });
    resolve(true);
  });

import users from './data/users';
import stories from './data/stories';

import UserModel from '../src/models/UserModel';
import StoryModel from '../src/models/StoryModel';
import dbConnect from '../src/db/connectDB';

const importData = async () => {
  try {
    await UserModel.create(users);
    await StoryModel.create(stories);
    console.log('data imported');
    process.exit(1);
  } catch (err) {
    console.log('import err ', err);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await UserModel.deleteMany(users);
    await StoryModel.deleteMany(stories);
    process.exit(1);
  } catch (err) {
    console.log('delete err ', err);
    process.exit(1);
  }
};
setEnv()
  .then(() => {
    dbConnect();
    return true;
  })
  .then((res) => {
    if (!res) process.exit(1);
    if (process.argv[2] === '-i') {
      console.log('Import');
      importData();
    } else if (process.argv[2] === '-d') {
      console.log('Delete');
      deleteData();
    }
  });
