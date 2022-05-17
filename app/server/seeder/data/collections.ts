import { buzzwords, phrases } from './words';
import { getRndInteger } from '../../src/lib/utils';
import Story from '../../src/models/Story';
import User from '../../src/models/User';
import StoryCollection from '../../src/models/StoryCollection';

export const generateCollections = async (minColl = 100, maxColl = 300) => {
  const storyIds = (await Story.find({}).lean()).map(({ _id }) => _id);
  const userIds = (await User.find({}).lean()).map(({ _id }) => _id);

  let allCollections = userIds.map((user) => {
    const noOfCrtUserCollection = getRndInteger(minColl, maxColl);
    const crtUserCollections = Array(noOfCrtUserCollection)
      .fill(1)
      .map((v, index) => ({
        user,
        stories: storyIds
          .sort((a, b) => Math.random() - Math.random())
          .slice(0, getRndInteger(0, 200)),
        title:
          index == 0
            ? 'Read Later'
            : buzzwords[getRndInteger(0, buzzwords.length)],
        description: phrases[getRndInteger(0, phrases.length)],
      }));
    return crtUserCollections;
  });
  const collectionsCreated = await StoryCollection.create(
    allCollections.flat()
  );
  console.log('):- Stories Collections generated.'.green.italic);
  return collectionsCreated;
};
