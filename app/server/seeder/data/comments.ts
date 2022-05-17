import { getRndInteger, lorem } from '../../src/lib/utils';
import Story from '../../src/models/Story';
import User from '../../src/models/User';
import Primary, {
  PrimaryCommentDocument,
} from '../../src/models/Comment/Primary';
import Secondary, {
  SecondaryCommentDocument,
} from '../../src/models/Comment/Secondary';

import CommentMeta from '../../src/models/Comment/CommentMeta';
import 'colors';
export const generatePrimaryComments = async () => {
  console.time('):- Primary Comments generated '.green.italic);
  const storyIds = (await Story.find({}).lean()).map((_id) => _id);
  const userIds = (await User.find({}).lean()).map(({ _id }) => _id);

  const mockPrimaryComments = storyIds.map((story) => {
    const noOfComments = getRndInteger(0, 20, true);

    const commentsOfStory = Array(noOfComments)
      .fill(1)
      .map(() => ({
        // text: phrases[getRndInteger(0, phrases.length)],

        text: lorem.generateWords(getRndInteger(0, 30)),
        user: userIds[getRndInteger(0, userIds.length)],
        story,
      }));
    return commentsOfStory;
  });
  const mockPrimaryCommentsCreated = await Primary.create(
    mockPrimaryComments.flat()
  );
  console.timeEnd('):- Primary Comments generated '.green.italic);

  return mockPrimaryCommentsCreated;
};

export const generateSecondaryComments = async () => {
  console.time('):- Secondary Comments generated '.green.italic);
  const primaryCommentsIds = (await Primary.find({}).lean()).map((_id) => _id);
  const userIds = (await User.find({}).lean()).map(({ _id }) => _id);

  const mockSecondaryComments = primaryCommentsIds.map((primary) => {
    const noOfReplies = getRndInteger(0, 10, true);

    const repliesToPrimary = Array(noOfReplies)
      .fill(1)
      .map(() => ({
        // text: phrases[getRndInteger(0, phrases.length)],

        text: lorem.generateWords(getRndInteger(0, 30)),
        user: userIds[getRndInteger(0, userIds.length)],
        primary,
      }));
    return repliesToPrimary;
  });
  const mockSecondaryCommentsCreated = await Secondary.create(
    mockSecondaryComments.flat()
  );
  console.timeEnd('):- Secondary Comments generated '.green.italic);
  return mockSecondaryCommentsCreated;
};

export const gradeComments = async () => {
  console.time('):- Comments graded '.green.italic);
  const users = (await User.find({}).lean()).map(({ _id }) => _id.toString());
  // let commentsMetas: any = [];
  // let dbTscPromises: any = [];

  const runProg = (
    comments: PrimaryCommentDocument[] | SecondaryCommentDocument[]
  ) =>
    new Promise((resolve) => {
      comments.forEach(async (comment, index) => {
        const noOfLikes = getRndInteger(0, users.length / 2);
        const noOfDislikes = getRndInteger(0, users.length / 2);

        const randomUsers = users.sort((a, b) => Math.random() - Math.random());

        const likedBy = randomUsers.slice(0, noOfLikes);

        const dislikedBy = randomUsers.slice(
          noOfLikes,
          noOfLikes + noOfDislikes
        );

        const commentMeta = {
          dislikedBy,
          likedBy,
          _id: comment._id,
        };
        // commentsMetas.push(commentMeta);
        await CommentMeta.create(commentMeta);

        comment.noOfLikes = noOfLikes;
        comment.noOfDislikes = noOfDislikes;
        // dbTscPromises.push(comment.save());
        await comment.save();
      });
      resolve(true);
    });
  const primaries = await Primary.find({});
  await runProg(primaries);

  // for (let i = 0; i < primaries.length; i = i + 50)
  //   await runProg(primaries.slice(i, i + 50));
  // await runProg(primaries.slice(Math.floor(primaries.length / 2), undefined));

  // const secondaries = await Secondary.find({});
  // for (let i = 0; i < primaries.length; i = i + 50)
  //   await runProg(secondaries.slice(i, i + 50));

  // await runProg(secondaries.slice(0, Math.floor(secondaries.length / 2)));
  // await runProg(
  //   secondaries.slice(Math.floor(secondaries.length / 2), undefined)
  // );

  // await Promise.allSettled(dbTscPromises);
  // await CommentMeta.create(commentsMetas);
  console.timeEnd('):- Comments graded '.green.italic);
  return;
};
