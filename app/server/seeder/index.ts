import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../', `config`, '.env'),
});

import dbConnect from '../src/db/connectDB';
import 'colors';

import Asset from '../src/models/Asset';
import Profile from '../src/models/Profile';
import Story from '../src/models/Story';
import StoryCollection from '../src/models/StoryCollection';
import StoryHistory from '../src/models/StoryHistory';
import StoryMeta from '../src/models/StoryMeta';
import Tag from '../src/models/Tag';
import Token from '../src/models/Token';
import User from '../src/models/User';

import Primary from '../src/models/Comment/Primary';
import Secondary from '../src/models/Comment/Secondary';
import CommentMeta from '../src/models/Comment/CommentMeta';

import { checkCompatibility } from './data/health';

const importData = async () => {
  try {
    const { default: tags } = await import('./data/tags');
    await Tag.create(tags);
    console.log('):- Tags generated.'.green.italic);

    const { generateUsers } = await import('./data/users');
    const userCreated = await User.create(generateUsers());
    console.log('):- Users generated.'.green.italic);

    await Profile.create(userCreated.map((_id) => ({ _id })));
    console.log('):- Profiles generated.'.green.italic);

    const { generateAssets } = await import('./data/assets');
    await Asset.create(await generateAssets());
    console.log('):- Assets generated.'.green.italic);

    const { generateStories, gradeStories } = await import('./data/stories');
    await Story.create(await generateStories());
    console.log('):- Stories generated.'.green.italic);

    const {
      generatePrimaryComments,
      gradeComments,
      generateSecondaryComments,
    } = await import('./data/comments');
    await Primary.create(await generatePrimaryComments());
    console.log('):- Primary Comments generated.'.green.italic);

    await Secondary.create(await generateSecondaryComments());
    console.log('):- Secondary Comments generated.'.green.italic);

    const { generateCollections } = await import('./data/collections');
    await StoryCollection.create(await generateCollections());
    console.log('):- Stories Collections generated.'.green.italic);

    await gradeStories();
    console.log('):- Stories graded.'.green.italic);

    await gradeComments();
    console.log('):- Comments graded.'.green.italic);

    await checkCompatibility();

    console.log('):- Data imported successfully'.green);
    process.exit();
  } catch (err) {
    console.log('error from import catch block', err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Asset.deleteMany();
    await Profile.deleteMany();
    await Story.deleteMany();
    await StoryCollection.deleteMany();
    await StoryHistory.deleteMany();
    await StoryMeta.deleteMany();
    await Tag.deleteMany();
    await Token.deleteMany();
    await User.deleteMany();

    await Primary.deleteMany();
    await Secondary.deleteMany();
    await CommentMeta.deleteMany();

    console.log('):- Data deleted '.red);
    process.exit(1);
  } catch (err) {
    console.log('delete err ', err);
    process.exit(1);
  }
};

(async () => {
  if (process.argv[2] === '-i') {
    await dbConnect();
    await importData();
  } else if (process.argv[2] === '-d') {
    await dbConnect();
    await deleteData();
  }
})();
