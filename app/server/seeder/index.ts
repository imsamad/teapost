import * as dotenv from "dotenv";
import path from "path";

const setEnv = () =>
  new Promise((resolve) => {
    dotenv.config({
      path: path.join(__dirname, "../", `config`, ".env"),
    });
    resolve(true);
  });

import users, { createUsers } from "./data/users";
import stories from "./data/stories";
import tags from "./data/tags";
import { primaries, createPrimaries } from "./data/primaries";
import secondaries, { createSecondaries } from "./data/secondaries";
import images from "./data/images";

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
import { nanoid } from "nanoid";
const getNewStories = () => {
  let temp: any = [];
  for (var i = 0; i < 100; i++)
    temp = [
      ...temp,
      ...stories.map((story, index) => ({
        ...story,
        slug: nanoid(),
      })),
    ];
  return temp;
};
const importData = async () => {
  try {
    // await Tag.create(tags);
    // await Image.create(images);

    await User.create(users);
    let userCreated = await User.create(await createUsers());
    let userIds: string[] = userCreated.map((usr) => usr._id);

    // const storiesss = await Story.create(stories);
    await Story.findOne({ title: "title" });

    let primariesCreated = await Primary.create(
      createPrimaries({
        storyIds: stories
          .filter((s, index) => index < 10 && true)
          .map((user) => user._id),
        userIds,
        qty: 100,
      })
    );

    // @ts-ignore
    let primaryIds: string[] = primariesCreated.map((prim) =>
      prim._id.toString()
    );

    const secCreted = await Secondary.create(
      createSecondaries({ primaryIds, userIds })
    );

    // console.log("data imported");
    process.exit(1);
  } catch (err) {
    console.log("import err ", err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    // await User.deleteMany();
    // await Image.deleteMany();
    // await Story.findOne({ title: "title" });
    // await Story.deleteMany();
    // await Tag.deleteMany();
    // await Profile.deleteMany();
    // await StoryMeta.deleteMany();
    // await StoryCollection.deleteMany();

    // primaries.forEach(async ({ story }) => {
    await Story.findByIdAndUpdate("6246f5a68e399c2b1c3382e8", {
      noOfComments: 0,
    });
    // });

    await Primary.deleteMany({ story: "6246f5a68e399c2b1c3382e8" });

    // await Secondary.deleteMany();
    // await CommentMeta.deleteMany();
    console.log("data deleted ");
    process.exit(1);
  } catch (err) {
    console.log("delete err ", err);
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
      deleteData();
    }
  });
