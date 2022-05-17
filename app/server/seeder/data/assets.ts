import titleImages from './titleImages';
import User from '../../src/models/User';
import { getRndInteger } from '../../src/lib/utils';
import 'colors';
import Asset from '../../src/models/Asset';
export const generateAssets = async (maxNoOfAssets?: number) => {
  const userIds = (await User.find({})).map(({ _id }) => _id.toString());
  const assets = userIds.map((user) => ({
    _id: user,
    images: titleImages
      .sort((a, b) => Math.random() - Math.random())
      .slice(
        0,
        getRndInteger(
          10,
          maxNoOfAssets || Math.floor(titleImages.length * 0.75)
        )
      )
      .map((image) => ({ src: image.secure_url, public_id: image.public_id })),
  }));
  const assetsCreated = await Asset.create(assets);
  console.log('):- Assets generated.'.green.italic);
  return assetsCreated;
};
