import titleImages from './titleImages';
import User from '../../src/models/User';
import { getRndInteger } from '../../src/lib/utils';

export const generateAssets = async () => {
  const userIds = (await User.find({})).map(({ _id }) => _id.toString());
  return userIds.map((user) => ({
    _id: user,
    images: titleImages
      .sort((a, b) => Math.random() - Math.random())
      .slice(0, getRndInteger(10, Math.floor(titleImages.length * 0.75)))
      .map((image) => ({ url: image.secure_url, public_id: image.public_id })),
  }));
};
