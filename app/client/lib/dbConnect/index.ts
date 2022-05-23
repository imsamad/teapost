import mongoose from 'mongoose';
import * as Models from '../models';
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore

  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(async (mongoose) => {
        await registerSchemas();
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
async function registerSchemas() {
  try {
    await Models.Asset.find({}).limit(1);
    await Models.Profile.find({}).limit(1);
    await Models.Story.find({}).limit(1);
    await Models.StoryCollection.find({}).limit(1);
    await Models.StoryHistory.find({}).limit(1);
    await Models.StoryMeta.find({}).limit(1);
    await Models.User.find({}).limit(1);
    await Models.Primary.find({}).limit(1);
    await Models.Secondary.find({}).limit(1);
    await Models.CommentMeta.find({}).limit(1);
  } catch {
  } finally {
    return 1;
  }
}
export default dbConnect;
