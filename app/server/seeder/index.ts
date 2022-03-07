import * as dotenv from "dotenv";
import path from "path";
const setEnv = () =>
  new Promise((resolve, reject) => {
    dotenv.config({
      path: path.join(__dirname, "../", `config`, ".env"),
    });
    resolve(true);
  });

import users from "./data/users";
import stories from "./data/stories";
import tags from "./data/tags";

import UserModel from "../src/models/UserModel";
import TagModel from "../src/models/TagModel";
import StoryModel from "../src/models/StoryModel";
import GradeModel from "../src/models/GradeModel";

import dbConnect from "../src/db/connectDB";

const importData = async () => {
  try {
    await UserModel.create(users);
    await StoryModel.create([stories[0], stories[1]]);
    await TagModel.create(tags);
    console.log("data imported");
    process.exit(1);
  } catch (err) {
    console.log("import err ", err);
    process.exit(1);
  }
};
const deleteData = async () => {
  try {
    await UserModel.deleteMany();
    await StoryModel.deleteMany();
    await TagModel.deleteMany();
    await GradeModel.deleteMany();
    console.log("data deleted ");
    process.exit(1);
  } catch (err) {
    console.log("delete err ", err);
    process.exit(1);
  }
};
setEnv()
  .then(() => {
    dbConnect(process.env.MONGO_URI);
    return true;
  })
  .then((res) => {
    if (!res) process.exit(1);
    if (process.argv[2] === "-i") {
      importData();
    } else if (process.argv[2] === "-d") {
      deleteData();
    }
  });
