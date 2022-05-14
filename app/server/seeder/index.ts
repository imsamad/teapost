import * as dotenv from 'dotenv';
import path from 'path';
// {
//   /* '165px', '132px', '198px', '198px' */
// }
function getRndInteger(min: number, max: number, include = false) {
  return Math.floor(Math.random() * (max - min + (include ? 1 : 0))) + min;
}
const avatar = () => `https://i.pravatar.cc/100`;
const titleImage = () => `https://random.imagecdn.app/800/600`;
const titleImageUnsplash = () => `https://source.unsplash.com/random/800x600`;
const setEnv = () =>
  new Promise((resolve) => {
    dotenv.config({
      path: path.join(__dirname, '../', `config`, '.env'),
    });
    resolve(true);
  });

import users from './data/users';
import tags from './data/tags';
import stories from './data/stories';
import { assets } from './data/assets';
import { phrases } from './data/slugs';

import User from '../src/models/User';
import Tag from '../src/models/Tag';
import Story from '../src/models/Story';

import StoryMeta from '../src/models/StoryMeta';
import Profile from '../src/models/Profile';
import Asset from '../src/models/Asset';
import StoryCollection from '../src/models/StoryCollection';
import Primary from '../src/models/Comment/Primary';
import Secondary from '../src/models/Comment/Secondary';
import CommentMeta from '../src/models/Comment/CommentMeta';

import dbConnect from '../src/db/connectDB';
import slugify from 'slugify';
import { createContent } from './data/createContent';
import { readingTime } from '../src/lib/utils';

const createCollections = async () => {
  try {
    const users = await User.find({}).lean();
    let collections: any = [];
    users.forEach(({ _id }) => {
      collections.push({ user: _id, title: 'Read Later' });
    });
    collections = await StoryCollection.create(collections);
  } catch (Err) {
    console.log('Error form createColection ', Err);
  }
};

const importComments = async () => {
  /*
  upload 1000 pix to cloudinary
  get images from cloudinary in array
  create assets with 100 random images from cloudinary
  
  create 100 users
      select profilePic from assets randomly
      select tagLines randomly
  
  create assets with 100 random images from cloudinary
  
  create 100 tags
  
  create 10000 stories -> 
      select author randomly
      select tags randomly
      createContent
      select titleImage from asset randomly
  
  createContent
  Title => As given by stories
  Subtitle => As given by stories
  No Of heading=random(10,20)
    No Of paragraph=random(1,10)
    Image if 10 < random(10,20) < 13 
      No of words length=random(100,500)  
      */
  const STORIES = await Story.find({});

  const singleComment = async (story: string, qty = 10) => {
    const comment = {
      user: users[getRndInteger(0, users.length - 1, true)]._id,
      text: phrases[getRndInteger(0, phrases.length - 1, true)],
      story,
    };

    var arr = Array(qty).fill(1);
    const promises: any = arr.map(() => Primary.create(comment));
    await Promise.allSettled(promises);
  };
  STORIES.forEach(async ({ _id }) => {
    await singleComment(_id);
  });
};
const insertContent = async () => {
  try {
    const stories = await Story.find({});
    let promise: any = [];
    stories.forEach((story) => {
      const content = createContent();
      promise.push(
        story.updateOne({
          content,
          readingTime: readingTime(content),
          titleImage: `https://source.unsplash.com/random/800x600`,
        })
      );
    });

    await Promise.allSettled(promise);
  } catch (err) {
    console.log('Error from insertConnet ', err);
  }
};

const createComment = async () => {
  const story = `6246f5a68e399c2b1c3382e8`;
  await Primary.deleteMany({ story });
  const imsamad = `627b2a94c93e8133f43c48ed`;
  let commentsNew = phrases
    .filter((a, b) => Math.random() - Math.random())
    .slice(0, 10)
    .map((text, index) => ({
      text,
      user: imsamad,
      story,
    }));
  await Story.findByIdAndUpdate(story, {
    noOfComments: commentsNew.length,
  });
  console.log('commentsNew ', commentsNew);
  await Primary.create(commentsNew);
};

const addComment = async () => {
  try {
  } catch (err) {
    console.log('error from addComment ', err);
  }
};
const importData = async () => {
  try {
    const id = `6246f5a68e399c2b1c3382e8`;
    const stories = await Story.find({});
    let promise: any = [];
    stories.forEach(async (story) => {
      story.titleImage = assets[getRndInteger(0, assets.length - 1)].secure_url;
      promise.push(story.save());
    });
    let val = await Promise.allSettled(promise);
    console.log(val);
    // await addComment();
    // await Story.findByIdAndUpdate(id, {
    //   content: createContent(),
    // });
    // await insertContent();
    // await createCollections();

    process.exit();
    let slugCount = 0;
    await Tag.create(tags);
    const userCreated = await User.create(users);

    userCreated.forEach(async function (user, index) {
      try {
        let crtUserStoriesLength = getRndInteger(0, 30, true);

        let storyOfCrtUser = stories
          .slice(slugCount, slugCount + crtUserStoriesLength)
          .map(({ slug, title, ...rest }, index) => ({
            ...rest,
            title: `${slugCount++} - ${title}`,
            author: user._id,
            tags: [tags[getRndInteger(0, tags.length)]._id],
            slug: slugify(title),
          }));
        let promise: any = [];
        promise.push(Story.create(storyOfCrtUser));

        promise.push(
          StoryCollection.create([
            {
              user: user._id,
              title: 'Read Later',
              description: 'Add stories to read in future',
            },
          ])
        );
        promise.push(Profile.create([{ _id: user._id }]));
        await Promise.allSettled(promise);
        if (index == users.length - 1) process.exit(1);
      } catch (err) {
        console.log('err from ', err);
        if (index == users.length - 1) process.exit(1);
      }
    });

    // await Asset.create(assets);
  } catch (err) {
    console.log('import err ', err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Tag.deleteMany();
    await Story.deleteMany();
    await Asset.deleteMany();
    await Profile.deleteMany();
    await StoryMeta.deleteMany();
    await StoryCollection.deleteMany();
    await Primary.deleteMany();
    await Secondary.deleteMany();
    await CommentMeta.deleteMany();
    console.log('data deleted ');
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
      importData();
    } else if (process.argv[2] === '-d') {
      deleteData();
    }
  });
