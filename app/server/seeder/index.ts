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
    const lightWeightsSeeders = async (isKickstart = false) => {
      const lengthOfDocs = isKickstart ? 10 : undefined;
      await seeder.generateTags(lengthOfDocs);
      await seeder.generateUsers(0, 10);
      await seeder.generateProfiles();
      await seeder.generateAssets(lengthOfDocs);
      await seeder.generateStories(lengthOfDocs);

      await seeder.generateUsers(10);

      await seeder.generatePrimaryComments();
      await seeder.generateSecondaryComments();
      await seeder.gradeStories();

      if (isKickstart) {
        console.log('):- Data created to kickstart the app'.magenta.italic);
        process.exit(1);
      }
      return;
    };
    await lightWeightsSeeders();

    /** Heavey task run individually */
    // await seeder.generateCollections();
    // await seeder.gradeComments();
    await seeder.checkCompatibility();

    console.log('):- Data imported successfully'.green);
  } catch (err) {
    console.log('error from import catch block', err);
  }
};

(async () => {
  await dbConnect(true);
  console.time('Processing time');
  if (process.argv[2] === '-i') await importData();
  else if (process.argv[2] === '-d') {
    // await seeder.checkCompatibility();
    await seeder.deleteData();
  }
  console.timeEnd('Processing time');
  process.exit(1);
})();
