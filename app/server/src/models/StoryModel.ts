import { Document, model, Schema } from 'mongoose';
import { ErrorResponse } from '../lib/utils';
import { UserDocument } from './UserModel';

export interface StoryDocument extends Document {
  title?: String;
  titleImage?: String;
  subtitle?: String;
  slug: string;
  tags?: String[];
  body?: { text: String; html: String };
  keywords?: String;
  isPublished: Boolean;
  isPublishedByAdmin: Boolean;
  author: UserDocument['_id'];
  data: Object;
  like: number;
  dislike: number;
}

const storySchema = new Schema(
  {
    data: Object,
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
          required: true,
          ref: 'Tag',
        },
      ],
    },
    body: String,
    keywords: {
      type: String,
      trim: true,
      // unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author of story is required.'],
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      require: true,
      default: false,
    },
    isPublishedByAdmin: {
      type: Boolean,
      require: [
        true,
        'Specifying the story, Is published or not is compulsary.',
      ],
      default: true,
      select: false,
    },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

storySchema.post(['save', 'updateOne'], errorHandlerMdlwr);
storySchema.post('findOneAndUpdate', errorHandlerMdlwr);

async function errorHandlerMdlwr(error: any, doc: StoryDocument, next: any) {
  if (error) {
    if (error?.code === 11000) {
      next(
        ErrorResponse(400, {
          slug: `This slug already registered.`,
        })
      );
    } else {
      next(ErrorResponse(400, 'Invalid data.'));
    }
  } else {
    next(error);
  }
}

const StoryModel = model<StoryDocument>('Story', storySchema);

export default StoryModel;
