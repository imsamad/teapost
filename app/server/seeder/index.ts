import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../', `config`, '.env'),
});
import 'colors';

import dbConnect from '../src/db/connectDB';
import * as seeder from './data';

const importData = async () => {
  try {
    const isKickstart = true;
    const lengthOfDocs = isKickstart ? 10 : undefined;
    await seeder.generateTags(lengthOfDocs);
    await seeder.generateUsers(lengthOfDocs);
    await seeder.generateProfiles();
    await seeder.generateAssets(lengthOfDocs);
    await seeder.generateStories(lengthOfDocs);

    if (isKickstart) {
      console.log('):- Data created to kickstart the app'.magenta.italic);
      process.exit(1);
    }
    await seeder.generatePrimaryComments();
    await seeder.generateSecondaryComments();

    await seeder.generateCollections(10, 50);

    await seeder.gradeStories();
    await seeder.gradeComments();

    await seeder.checkCompatibility();

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
    await seeder.deleteData();
  }
})();
