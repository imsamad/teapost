import * as dotenv from "dotenv";
import path from "path";

const setEnv = () =>
  new Promise((resolve) => {
    dotenv.config({
      path: path.join(__dirname, "../", `config`, ".env"),
    });
    resolve(true);
  });

import User from "../src/models/User";
import Tag from "../src/models/Tag";
import Story from "../src/models/Story";
import StoryMeta from "../src/models/StoryMeta";
import Profile from "../src/models/Profile";
import Image from "../src/models/Image";
import StoryCollection from "../src/models/StoryCollection";
import Primary from "../src/models/Comment/Primary";
import Secondary from "../src/models/Comment/Secondary";
import CommentMeta from "../src/models/Comment/CommentMeta";

import dbConnect from "../src/db/connectDB";
import slugify from "slugify";
import { readAbleDate } from "../src/lib/utils";

const importData = async () => {
  let pathName = slugify(readAbleDate(new Date(), true));
  try {
    await Tag.find({});
    await Image.find({});
    await User.find({});
    await StoryCollection.find({});
    await Profile.find({});
    await Story.find({});
    await StoryMeta.find({});

    await Primary.find({});
    await CommentMeta.find({});
    await Secondary.find({});
    console.log("data imported");
    process.exit(1);
  } catch (err) {
    console.log("import err ", err);
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
    if (process.argv[2] === "-i") {
      importData();
    } else if (process.argv[2] === "-d") {
      //   deleteData();
    }
  });
