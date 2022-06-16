import { Document, model, Schema, Types } from 'mongoose';
import { ErrorResponse, validateYupSchema } from '../lib/utils';
import { StoryMetaDocument } from './StoryMeta';
import { UserDocument } from './User';
import StoryType from '../lib/types/StoryType';
import { isAbleToPublished } from '../lib/schema/storySchema';

export interface StoryDocument
  extends Omit<StoryType, '_id' | 'meta'>,
    Document {
  author: UserDocument['_id'];
  meta?: StoryMetaDocument;
  hadEmailedToFollowers?: boolean;
  collabWith: Types.Array<UserDocument['_id']>;
  publishedStory: () => Promise<any>;
}

export const storyAllowedFields = [
  'title',
  'subtitle',
  'titleImage',
  'slug',
  'tags',
  'content',
  'keywords',
];

const storySchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    titleImage: String,
    subtitle: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Tag',
        },
      ],
    },
    content: String,
    keywords: {
      type: String,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author of story is required.'],
      ref: 'User',
    },
    collabWith: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isPublished: {
      type: Boolean,
      require: true,
      default: false,
    },
    hadEmailedToFollowers: {
      type: Boolean,
      default: false,
    },
    isPublishedByAdmin: {
      type: Boolean,
      default: true,
    },
    readingTime: { type: Number, default: 0 },
    noOfViews: { type: Number, default: 0 },
    noOfComments: { type: Number, default: 0 },
    noOfLikes: { type: Number, default: 0 },
    noOfDislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

storySchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  let user = await this.model('User').findById(this.author);
  if (!user) {
    next(
      ErrorResponse(400, {
        message: 'Not authorised',
      })
    );
    return;
  }

  user = await this.model('User').findOneAndUpdate(
    { _id: this.author },
    { $inc: { stories: 1 } }
  );

  next();
});

storySchema.post(['save', 'updateOne'], errorHandlerMdlwr);
storySchema.post('findOneAndUpdate', errorHandlerMdlwr);

storySchema.methods.publishedStory = async function () {
  const story = this as StoryDocument;
  try {
    await validateYupSchema(isAbleToPublished, story);

    story.isPublished = true;
    if (!story.hadEmailedToFollowers) {
      /*
       * Send Email To Followers of story.author
       *****************************************************/

      story.hadEmailedToFollowers = true;
    }
    return await story.save();
  } catch (err) {
    throw {
      storyId: story._id,
      message: `${story._id} can't be published`,
      reason: err,
    };
  }
};
async function errorHandlerMdlwr(error: any, doc: StoryDocument, next: any) {
  if (error) {
    if (error?.code === 11000) {
      next(
        ErrorResponse(400, {
          slug: `${doc?.slug || 'This slug'} already have story associted.`,
        })
      );
    } else {
      next('error');
    }
  } else {
    next(error);
  }
}

storySchema.virtual('meta', {
  ref: 'StoryMeta',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
});

storySchema.virtual('comments', {
  ref: 'Primary',
  localField: '_id',
  foreignField: 'story',
  justOne: false,
});

storySchema.pre('remove', async function (next) {
  // Remove related StoryMeta + StoryHistory + All Primary ==> Secondary
  let deletedPrimary: any = await this.model('Primary').find({
    story: this._id,
  });

  let promises: any = [];

  promises.push(this.model('StoryMeta').findByIdAndRemove(this._id));
  promises.push(this.model('StoryHistory').findByIdAndRemove(this._id));
  // promises.push(
  //   this.model('Profile').updateMany(
  //     {},
  //     {
  //       $pull: { likedStories: this._id, dislikedStories: this._id },
  //     }
  //   )
  // );

  promises.push(
    this.model('User').findOneAndUpdate(
      { _id: this.author },
      { $inc: { stories: -1 } }
    )
  );

  deletedPrimary.forEach((primary: any, index: any) =>
    promises.push(primary.remove())
  );

  Promise.allSettled(promises)
    .then((res: any) => {})
    .finally(() => {
      next();
    });
});

const Story = model<StoryDocument>('Story', storySchema);

export default Story;
