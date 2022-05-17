import Primary from '../../src/models/Comment/Primary';
import Secondary from '../../src/models/Comment/Secondary';
import Story from '../../src/models/Story';
import User from '../../src/models/User';
import 'colors';
import Profile from '../../src/models/Profile';
import Tag from '../../src/models/Tag';
import Asset from '../../src/models/Asset';
import StoryMeta from '../../src/models/StoryMeta';
import CommentMeta from '../../src/models/Comment/CommentMeta';
import StoryCollection from '../../src/models/StoryCollection';

export const checkCompatibility = async () => {
  console.log('):- Checking Data compatibilties'.blue);

  const users = await User.find({}).lean();
  const totalStories = users.reduce(
    (total, crtUser) => total + crtUser.stories,
    0
  );
  const stories = await Story.find({}).populate('meta').lean();
  if (totalStories != stories.length) {
    console.log(
      `Total stories eexist in DB conflict with no of stories registered in User schema`
    );
  }

  const totalComments = stories.reduce(
    (total, crtStory) => total + crtStory.noOfComments,
    0
  );
  const primaries = await Primary.find({}).lean();
  const secondaries = await Secondary.find({}).lean();

  if (primaries.length + secondaries.length != totalComments) {
    console.log(
      `Total comments exist in DB conflict with no of comments registered in Story schema`
    );
  }

  let everyThingHonkeyDory = 0;

  const pro = () =>
    new Promise((resolve) => {
      stories.slice(0, 100).forEach(async (story, index) => {
        const noOfUsersLiked = (
          await Profile.find({
            likedStories: { $in: [story._id] },
          }).lean()
        ).length;
        const noOfUsersDisliked = (
          await Profile.find({
            dislikedStories: { $in: [story._id] },
          }).lean()
        ).length;
        if (noOfUsersDisliked != story.noOfDislikes) {
          console.log(`Story ${story._id} have mismatched disliked`);
        }
        if (noOfUsersLiked != story.noOfLikes) {
          console.log(`Story ${story._id} have mismatched liked`);
        }
        console.log(
          `Story.noOfLikes=> ${story.noOfLikes} <=> noOfUsersLiked ${noOfUsersLiked} `
        );
        console.log(
          `Story.noOfDislikes=> ${story.noOfDislikes} <=> noOfUsersDisliked ${noOfUsersDisliked} `
        );
        if (index == stories.length - 1) resolve(true);
      });
    });
  // await pro();
  stories.forEach((story) => {
    if (
      story.noOfLikes != 0 &&
      (!story?.meta || story.noOfLikes != story.meta.likedBy.length)
    ) {
      everyThingHonkeyDory++;
      console.log(`Story with id ${story._id} have mismatch like fields.`);
    }

    if (
      story.noOfDislikes != 0 &&
      (!story?.meta || story.noOfDislikes != story.meta.dislikedBy.length)
    ) {
      everyThingHonkeyDory++;
      console.log(`Story with id ${story._id} have mismatch dislike fields.`);
    }
  });

  if (everyThingHonkeyDory)
    console.log(`${everyThingHonkeyDory} stories is not according to schemas`);

  console.log(`Total Tags ${await Tag.countDocuments()}`.blue.italic);
  console.log(`Total Users ${users.length}`.blue.italic);
  console.log(`Total Profiles ${await Profile.countDocuments()}`.blue.italic);
  console.log(
    `Total Collections ${await StoryCollection.countDocuments()}`.blue.italic
  );
  console.log(`Total Assets ${await Asset.countDocuments()}`.blue.italic);
  console.log(`Total Stories ${stories.length}`.blue.italic);
  console.log(
    `Total StoryMetas ${await StoryMeta.countDocuments()}`.blue.italic
  );
  console.log(`Total Primary ${primaries.length}`.blue.italic);
  console.log(`Total Secondary ${secondaries.length}`.blue.italic);
  console.log(
    `Total Comments ${primaries.length + secondaries.length}`.blue.italic
  );

  console.log(
    `Total CommentMetas ${await CommentMeta.countDocuments()}`.blue.italic
  );
};
