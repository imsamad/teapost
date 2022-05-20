import slugify from 'slugify';
import {
  capitalFirst,
  getRndInteger,
  lorem,
  randomDate,
  readingTime,
} from '../../src/lib/utils';

import { createContent } from './createContent';
import titleImages from './titleImages';
import { phrases } from './words';
import User from '../../src/models/User';
import Tag from '../../src/models/Tag';
import Story, { StoryDocument } from '../../src/models/Story';
import StoryMeta from '../../src/models/StoryMeta';
import Profile from '../../src/models/Profile';
import 'colors';

const titleImagesLen = titleImages.length;

const phrasesLen = phrases.length;

export const generateStories = async (len = phrasesLen - 1) => {
  console.time('):- Stories generated '.green.italic);

  const userIds = (await User.find({}).lean()).map(({ _id }) => _id.toString());
  const tagIds = (await Tag.find({}).lean()).map(({ _id }) => _id.toString());
  const tagLen = tagIds.length;

  if (len > phrasesLen - 1) {
    console.warn(
      `${len} Length exceed phraes length so could not generate uniqiue title`
    );
    throw Error(
      `${len} Length exceed phraes length so could not generate uniqiue title`
    );
  }
  const generatedStories = Array(len)
    .fill(1)
    .map((val, index) => {
      const content = createContent();
      const title: string = phrases[index];

      const newStory = {
        title,
        subtitle: capitalFirst(lorem.generateSentences(3)),
        author: userIds[getRndInteger(0, userIds.length)],
        keywords: lorem.generateSentences(3),
        content,
        readingTime: readingTime(content),
        tags: [tagIds[getRndInteger(0, tagLen)]],
        slug: slugify(title.toLowerCase()),
        titleImage: titleImages[getRndInteger(0, titleImagesLen)].secure_url,
        isPublished: true,
        isPublishedByAdmin: true,
        hadEmailedToFollowers: true,
        noOfViews: 0,
        noOfComments: 0,
        noOfLikes: 0,
        noOfDislikes: 0,
        createdAt: randomDate(),
      };
      return newStory;
    });
  const createStories = await Story.create(generatedStories);
  console.timeEnd('):- Stories generated '.green.italic);
  return createStories;
};
export const downgradeStories = async () => {
  await Story.updateMany({}, { noOfLikes: 0, noOfDislikes: 0 });
  await StoryMeta.deleteMany();
  await Profile.updateMany({}, { likedStories: [], dislikedStories: [] });
  console.log('):- Stories downgrades'.blue);
};

export const gradeStories = async () => {
  console.time('):- Stories graded '.green.italic);
  const users = (await User.find({}).lean()).map(({ _id }) => _id.toString());

  // let storyMetas: any = [];
  // let dbTscPromises: any = [];

  const runProg = (stories: StoryDocument[]) =>
    new Promise(async (resolve) => {
      stories.forEach(async (story, index) => {
        const noOfLikes = getRndInteger(0, users.length / 2);
        const noOfDislikes = getRndInteger(0, users.length / 2);

        const randomUsers = users.sort((a, b) => Math.random() - Math.random());

        const likedBy = randomUsers.slice(0, noOfLikes);

        const dislikedBy = randomUsers.slice(
          noOfLikes,
          noOfLikes + noOfDislikes
        );
        const storyMeta = {
          dislikedBy,
          likedBy,
          _id: story._id,
        };
        // storyMetas.push(storyMeta);
        await StoryMeta.create(storyMeta);
        story.noOfLikes = noOfLikes;
        story.noOfDislikes = noOfDislikes;
        // dbTscPromises.push(story.save());
        await story.save();

        let profileUpdateRef: any = Profile.updateMany(
          { _id: { $in: likedBy } },
          {
            $addToSet: { likedStories: story._id },
            $pull: { dislikedStories: story._id },
          }
        );
        // dbTscPromises.push(profileUpdateRef);
        await profileUpdateRef;
        profileUpdateRef = Profile.updateMany(
          { _id: { $in: dislikedBy } },
          {
            $addToSet: { dislikedStories: story._id },
            $pull: { likedStories: story._id },
          }
        );
        // dbTscPromises.push(profileUpdateRef);
        await profileUpdateRef;
        if (index == stories.length - 1) resolve(true);
      });
    });

  let stories = await Story.find({});
  for (let i = 0; i < stories.length; i = i + 50)
    await runProg(stories.slice(i, i + 50));

  // await runProg(stories.slice(0, Math.floor(stories.length / 2)));
  // await runProg(stories.slice(Math.floor(stories.length / 2), undefined));
  // await Promise.allSettled(dbTscPromises);
  // await StoryMeta.create(storyMetas);

  console.timeEnd('):- Stories graded '.green.italic);
  return;
};
