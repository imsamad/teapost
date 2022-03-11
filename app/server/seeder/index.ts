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
import StoryMetaModel from "../src/models/StoryMetaModel";
import ProfileModel from "../src/models/ProfileModel";
import StoryCollection from "../src/models/StoryCollectionModel";

import dbConnect from "../src/db/connectDB";

const importData = async () => {
  try {
    await UserModel.create(users);
    await StoryModel.create(stories);
    await TagModel.create(tags);
    await StoryMetaModel.create(stories.map((s) => ({ _id: s._id })));
    await ProfileModel.create(users.map((user) => ({ _id: user._id })));
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
    await ProfileModel.deleteMany();
    await StoryMetaModel.deleteMany();
    await StoryCollection.deleteMany();
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
