import * as dotenv from 'dotenv';
import path from 'path';

function getRndInteger(min: number, max: number, include = false) {
  return Math.floor(Math.random() * (max - min + (include ? 1 : 0))) + min;
}
const avatar = () => `https://i.pravatar.cc/100`;
const titleImage = () => `https://random.imagecdn.app/800/600`;

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
import slugs from './data/slugs';

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

const importData = async () => {
  try {
    let storyCreated = 0;
    let slugCount = 0;
    await Tag.create(tags);
    const userCreated = await User.create(users);

    userCreated.forEach(async function (user, index) {
      try {
        let crtUserStoriesLength = getRndInteger(0, 30, true);

        let tagsIndex = getRndInteger(0, tags.length - 4, true);

        let storyOfCrtUser = stories
          .slice(storyCreated, storyCreated + crtUserStoriesLength)
          .map(({ slug, title, ...rest }) => ({
            ...rest,
            title: `${slugCount + 1} - ${slugs[slugCount]}`,
            author: user._id,
            tags: tags.slice(tagsIndex, tagsIndex + 3),
            slug: slugify(slugs[slugCount++]),
          }));

        storyCreated += crtUserStoriesLength;
        await Story.create(storyOfCrtUser);

        await StoryCollection.create([
          {
            user: user._id,
            title: 'Read Later',
            description: 'Add stories to read in future',
          },
        ]);
        await Profile.create([{ _id: user._id }]);

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
