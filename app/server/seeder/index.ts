import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../', `config`, '.env'),
});

import dbConnect from '../src/db/connectDB';
import 'colors';

import { checkCompatibility } from './data/health';
import { generateTags } from './data/tags';
import { generateProfiles, generateUsers } from './data/users';
import { generateAssets } from './data/assets';
import { generateStories, gradeStories } from './data/stories';
import {
  generatePrimaryComments,
  generateSecondaryComments,
  gradeComments,
} from './data/comments';
import { generateCollections } from './data/collections';
import { deleteData } from './data/deleteData';

const importData = async () => {
  try {
    const isKickstart = !false;
    const lengthOfDocs = isKickstart ? 10 : undefined;
    await generateTags(lengthOfDocs);
    await generateUsers(lengthOfDocs);
    await generateProfiles();
    await generateAssets(lengthOfDocs);
    await generateStories(lengthOfDocs);

    if (isKickstart) {
      console.log('):- Data created to kickstart the app'.magenta.italic);
      process.exit(1);
    }
    await generatePrimaryComments();
    await generateSecondaryComments();

    await generateCollections();

    await gradeStories();
    await gradeComments();

    await checkCompatibility();

    console.log('):- Data imported successfully'.green);
    process.exit();
  } catch (err) {
    console.log('error from import catch block', err);
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
