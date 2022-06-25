import Primary, { PrimaryCommentDocument } from "../src/models/Comment/Primary";
import Secondary, {
  SecondaryCommentDocument,
} from "../src/models/Comment/Secondary";
import Story, { StoryDocument } from "../src/models/Story";
import User from "../src/models/User";
import "colors";
import Profile from "../src/models/Profile";
import Tag from "../src/models/Tag";
import Asset from "../src/models/Asset";
import StoryMeta from "../src/models/StoryMeta";
import CommentMeta from "../src/models/Comment/CommentMeta";
import StoryCollection from "../src/models/StoryCollection";
import StoryHistory from "../src/models/StoryHistory";
import Token from "../src/models/Token";

import { seeder } from "./data";

export const deleteData = async () => {
  try {
    await Asset.deleteMany();

    await Profile.deleteMany();
    await Story.deleteMany();
    await StoryCollection.deleteMany();
    await StoryHistory.deleteMany();
    await StoryMeta.deleteMany();
    await Tag.deleteMany();
    await Token.deleteMany();
    await User.deleteMany();

    await Primary.deleteMany();
    await Secondary.deleteMany();
    await CommentMeta.deleteMany();

    console.log("):- Data deleted ".red);
  } catch (err) {
    console.log("delete err ", err);
  }
};

export const importData = async (isKickstart = false) => {
  try {
    const lightWeightsSeeders = async () => {
      const lengthOfDocs = isKickstart ? 10 : undefined;
      await seeder.generateTags(lengthOfDocs);
      // initial 10 authors
      await seeder.generateUsers(0, 10);
      await seeder.generateStories(lengthOfDocs);

      if (isKickstart) {
        console.log("):- Data created to kickstart the app".magenta.italic);
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

    /** Heavy task run individually */
    await lightWeightsSeeders();
    // await seeder.generateCollections();
    // await seeder.gradeComments();
    // await seeder.checkCompatibility(!true);

    console.log("):- Data imported successfully".green);
  } catch (err) {
    console.log("error from import catch block", err);
  }
};
export const checkCompatibility = async (onlySecondaries = false) => {
  console.log("):- Checking Data compatibilties".blue);
  if (onlySecondaries) {
    const secondaries = await Secondary.find({}).populate("meta").lean();
    for (let i = 0; i < secondaries.length; i += 1000)
      // @ts-ignore
      areGradesCompatible(secondaries.slice(i, i + 1000), "Secondary Comment");
    console.log("):- Secondaries are compatible ".blue.italic);
    return;
  }

  const users = await User.find({}).lean();
  const stories = await Story.find({}).populate("meta").lean();

  function areGradesCompatible(
    docs:
      | StoryDocument[]
      | PrimaryCommentDocument[]
      | SecondaryCommentDocument[],
    label: string
  ) {
    let everyThingNotHonkeyDory = 0;
    docs.forEach((doc) => {
      if (
        doc.noOfLikes != 0 &&
        (!doc?.meta || doc.noOfLikes != doc.meta.likedBy.length)
      ) {
        everyThingNotHonkeyDory++;
        console.log(`${label} with id ${doc._id} have mismatch like fields.`);
      }

      if (
        doc.noOfDislikes != 0 &&
        (!doc?.meta || doc.noOfDislikes != doc.meta.dislikedBy.length)
      ) {
        everyThingNotHonkeyDory++;
        console.log(
          `${label} with id ${doc._id} have mismatch dislike fields.`
        );
      }
    });
    if (everyThingNotHonkeyDory)
      console.log(
        `${everyThingNotHonkeyDory} ${label} is not according to schemas`
      );
  }
  // @ts-ignore
  areGradesCompatible(stories, "Story");

  const primaries = await Primary.find({}).populate("meta").lean();
  // @ts-ignore
  areGradesCompatible(primaries, "Primary Comment");

  const totalComments = stories.reduce(
    (total, crtStory) => total + crtStory.noOfComments,
    0
  );

  const totalStories = users.reduce(
    (total, crtUser) => total + crtUser.stories,
    0
  );
  if (totalStories != stories.length) {
    console.log(
      `Total stories exist in DB conflict with no of stories registered in User schema`
    );
  }

  const totPrim = await Primary.countDocuments();
  const totSec = await Secondary.countDocuments();
  if (totPrim + totSec != totalComments) {
    console.log(
      `Total comments exist in DB conflict with no of comments registered in Story schema`
    );
  }
};

export const totalDocs = async () => {
  console.log(`Total Tags ${await Tag.countDocuments()}`.blue.italic);
  console.log(`Total Users ${await User.countDocuments()}`.blue.italic);
  console.log(`Total Stories ${await Story.countDocuments()}`.blue.italic);
  console.log(`Total Profiles ${await Profile.countDocuments()}`.blue.italic);
  console.log(
    `Total Collections ${await StoryCollection.countDocuments()}`.blue.italic
  );

  console.log(`Total Assets ${await Asset.countDocuments()}`.blue.italic);
  console.log(`Total Stories ${await Story.countDocuments()}`.blue.italic);
  console.log(
    `Total StoryMetas ${await StoryMeta.countDocuments()}`.blue.italic
  );
  const totPrim = await Primary.countDocuments();
  const totSec = await Secondary.countDocuments();
  console.log(`Total Primary ${totPrim}`.blue.italic);
  console.log(`Total Secondary ${totSec}`.blue.italic);
  console.log(`Total Primary +  Secondary ${totPrim + totSec}`.blue.italic);
  console.log(
    `Total CommentMetas ${await CommentMeta.countDocuments()}`.blue.italic
  );
};
