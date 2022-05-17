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
  console.log('):- Primary Comments generated.'.green.italic);

  return mockPrimaryCommentsCreated;
};

export const generateSecondaryComments = async () => {
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
  console.log('):- Primary Comments generated.'.green.italic);
  return mockSecondaryCommentsCreated;
};

export const gradeComments = async () => {
  const primaries = await Primary.find({});
  const secondaries = await Secondary.find({});

  const users = (await User.find({}).lean()).map(({ _id }) => _id.toString());
  let commentsMetas: any = [];
  let dbTscPromises: any = [];

  const runProg = (
    comments: PrimaryCommentDocument[] | SecondaryCommentDocument[]
  ) =>
    new Promise((resolve) => {
      comments.forEach((comment, index) => {
        const noOfLikes = getRndInteger(0, users.length / 2);
        const noOfDislikes = getRndInteger(0, users.length / 2);

        const randomUsers = users.sort((a, b) => Math.random() - Math.random());

        const likedBy = randomUsers.slice(0, noOfLikes);

        const dislikedBy = randomUsers.slice(
          noOfLikes,
          noOfLikes + noOfDislikes
        );

        commentsMetas.push({
          dislikedBy,
          likedBy,
          _id: comment._id,
        });

        comment.noOfLikes = noOfLikes;
        comment.noOfDislikes = noOfDislikes;
        dbTscPromises.push(comment.save());
      });
      resolve(true);
    });
  await runProg(primaries);
  await runProg(secondaries);
  await Promise.allSettled(dbTscPromises);
  await CommentMeta.create(commentsMetas);
  console.log('):- Stories graded.'.green.italic);
  return;
};
