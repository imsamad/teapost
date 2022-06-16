import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../', `config`, '.env'),
});

import 'colors';

import connectDB from '../src/db/connectDB';
import * as seeder from './data';

const importData = async (isKickstart = false) => {
  try {
    const lightWeightsSeeders = async () => {
      const lengthOfDocs = isKickstart ? 10 : undefined;
      await seeder.generateTags(lengthOfDocs);
      // initial 10 authors
      await seeder.generateUsers(0, 10);
      await seeder.generateStories(lengthOfDocs);

      if (isKickstart) {
        console.log('):- Data created to kickstart the app'.magenta.italic);
        // process.exit(1);
        return;
      }

      // after 10 all readers
      await seeder.generateUsers(10);

      await seeder.generateAssets();
      await seeder.generateProfiles();
      await seeder.addCollaborators();
      await seeder.gradeStories();

      await seeder.generatePrimaryComments();
      await seeder.generateSecondaryComments();

      return;
    };
    // await lightWeightsSeeders();

    /** Heavy task run individually */
    await seeder.generateCollections();
    // await seeder.gradeComments();
    // await seeder.checkCompatibility(!true);

    console.log('):- Data imported successfully'.green);
  } catch (err) {
    console.log('error from import catch block', err);
  }
};

(async () => {
  console.time('Processing time '.green);

  await connectDB(true);

  if (process.argv[2] == '-d') await seeder.deleteData();
  else await importData(process.argv[2] == '-k');

  console.timeEnd('Processing time '.green);
  await seeder.totalDocs();
  // process.off
  // process.abort();
  return;
  // process.exit(1);
})();
