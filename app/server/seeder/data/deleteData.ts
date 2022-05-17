import Asset from '../../src/models/Asset';
import Profile from '../../src/models/Profile';
import Story from '../../src/models/Story';
import StoryCollection from '../../src/models/StoryCollection';
import StoryHistory from '../../src/models/StoryHistory';
import StoryMeta from '../../src/models/StoryMeta';
import Tag from '../../src/models/Tag';
import Token from '../../src/models/Token';
import User from '../../src/models/User';

import Primary from '../../src/models/Comment/Primary';
import Secondary from '../../src/models/Comment/Secondary';
import CommentMeta from '../../src/models/Comment/CommentMeta';
import 'colors';

export const deleteData = async () => {
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
