 
import { generateTags } from './tags';
import { generateProfiles, generateUsers } from './users';
import { generateAssets } from './assets';
import { generateStories, gradeStories, addCollaborators } from './stories';
import {
  generatePrimaryComments,
  generateSecondaryComments,
  gradeComments,
} from './comments';
import { generateCollections } from './collections';

const seeder={
  generateTags,
  generateProfiles,
  generateUsers,
  generateAssets,
  generateStories,
  gradeStories,
  generatePrimaryComments,
  generateSecondaryComments,
  gradeComments,
  generateCollections,
  addCollaborators,

}
export {seeder}
