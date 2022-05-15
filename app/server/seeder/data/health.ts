import Primary from '../../src/models/Comment/Primary';
import Secondary from '../../src/models/Comment/Secondary';
import Story from '../../src/models/Story';
import User from '../../src/models/User';
import 'colors';
export const checkCompatibility = async () => {
  console.log('):- Checking Data compatibilties'.blue);
  const users = await User.find({}).lean();
  const totalStories = users.reduce(
    (total, crtUser) => total + crtUser.stories,
    0
  );
  console.log('Total No. of stories created by Users ', totalStories);
  const stories = await Story.find({}).populate('meta').lean();

  console.log('Total stories exist in DB', stories.length);

  const totalComents = stories.reduce(
    (total, crtStory) => total + crtStory.noOfComments,
    0
  );

  console.log('Total No. of comments registered in stories', totalComents);

  const primaries = await Primary.find({}).lean();
  const secondaries = await Secondary.find({}).lean();
  console.log(
    'Total No of 1* & 2* comments exist in DB ',
    primaries.length + secondaries.length
  );

  let flag = 0;

  stories.forEach((story) => {
    if (
      story.noOfLikes != 0 &&
      (!story?.meta || story.noOfLikes != story.meta.likedBy.length)
    ) {
      flag++;
      console.log(`Story with id ${story._id} have mismatch like fields.`);
    }

    if (
      story.noOfDislikes != 0 &&
      (!story?.meta || story.noOfDislikes != story.meta.dislikedBy.length)
    ) {
      flag++;
      console.log(`Story with id ${story._id} have mismatch dislike fields.`);
    }
  });

  if (flag) {
    console.log(`${flag} stories is not according to schemas`);
  } else {
    console.log('Every thing is hunky-dory');
  }
};
