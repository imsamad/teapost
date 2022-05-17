import { buzzwords, phrases } from './words';
import { getRndInteger } from '../../src/lib/utils';
import Story from '../../src/models/Story';
import User from '../../src/models/User';
import StoryCollection from '../../src/models/StoryCollection';
import 'colors';
import sizeof from 'object-sizeof';
export const generateCollections = async (
  minColl = 100,
  maxColl = 500,
  maxStoriesinColl = 300
) => {
  console.time('):- Stories Collections generated '.green.italic);

  const storyIds = (await Story.find({}).lean()).map(({ _id }) => _id);
  const users = (await User.find({}).lean()).map(({ _id }) => _id);

  let allCollections = users.map((user) => {
    const noOfCrtUserCollection = getRndInteger(minColl, maxColl);
    const crtUserCollections = Array(noOfCrtUserCollection)
      .fill(1)
      .map((v, index) => ({
        user,
        stories: storyIds
          .sort((a, b) => Math.random() - Math.random())
          .slice(0, getRndInteger(0, maxStoriesinColl)),
        title:
          index == 0
            ? 'Read Later'
            : buzzwords[getRndInteger(0, buzzwords.length)],
        description: phrases[getRndInteger(0, phrases.length)],
      }));
    return crtUserCollections;
  });

  // console.log('allCollections ', allCollections);
  // console.log('sizeof ', sizeof(allCollections));
  // console.log(allCollections.length, 'And ', allCollections.flat().length);

  const flattedColections = allCollections.flat();
  for (let i = 0; i < flattedColections.length; i += 100)
    await StoryCollection.create(flattedColections.slice(i, i + 100));

  console.timeEnd('):- Stories Collections generated '.green.italic);
};
