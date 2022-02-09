import { Document, model, Schema } from 'mongoose';
import { ErrorResponse, validateYupSchema } from '../lib/utils';
import { isAbleToPublished } from '../schema/story';
import { UserDocument } from './UserModel';

// mongoose.plugin((schema: Schema) => {
//   schema.pre('findOneAndUpdate', setRunValidators);
//   schema.pre('updateMany', setRunValidators);
//   schema.pre('updateOne', setRunValidators);
//   schema.pre('update', setRunValidators);
// });

// function setRunValidators(this: any) {
//   this.setOptions({ runValidators: true });
// }

export interface StorySchemaDocument extends Document {
  title?: String;
  subtitle?: String;
  slug?: String;
  tags?: String[];
  body?: { text: String; html: String };
  keywords?: String;
  isPublished: Boolean;
  isPublishedByAdmin: Boolean;
  authorId: UserDocument['_id'];
}

const storySchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
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
      type: [{ type: Schema.Types.ObjectId, required: true, ref: 'Tag' }],
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
      require: [
        true,
        'Specifying the story is published or not is compulsary.',
      ],
      default: false,
      validate: {
        validator: async function (
          isPublished: StorySchemaDocument['isPublished']
        ) {
          if (!isPublished) return true;
          else {
            const res = await storyValidator(this, 'validator');
            return res === true && true;
          }
        },
        message: (props: any) => {
          return `Story lacking essential fields to make it publishable.`;
        },
      },
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
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

storySchema.post(['save', 'updateOne'], errorHandlerMdlwr);
storySchema.post('findOneAndUpdate', errorHandlerMdlwr);

async function errorHandlerMdlwr(
  error: any,
  doc: StorySchemaDocument,
  next: any
) {
  if (error) {
    if (error?.errors?.isPublished) {
      // @ts-ignore
      const result: any = await storyValidator(this, 'mdlwr');

      next(ErrorResponse(422, result));
    } else if (error?.code === 11000) {
      next(
        ErrorResponse(400, {
          slug: `${doc.slug || 'This slug'} already registered.`,
        })
      );
    } else {
      let errMsg: any = [];
      Object.keys(error.errors).forEach((key) => {
        errMsg.push({ [key]: `${key} must be proper.` });
      });
      next(ErrorResponse(400, errMsg));
    }
  } else {
    next(error);
  }
}

const StoryModel = model<StorySchemaDocument>('Story', storySchema);

export default StoryModel;

async function storyValidator(user: any, from = 'one') {
  let docToUpdate: any;
  console.log('from ', from);
  if (
    user.title ||
    user.subtitle ||
    user.slug ||
    user.tags ||
    user.body ||
    user.keywords
  ) {
    console.log(`In ${from} got int first attemp`);
    docToUpdate = user;
  } else {
    console.log(`In ${from} got int second attemp`);
    docToUpdate = await user.model.findOne(user.getQuery());
  }
  console.log(`In ${from} docToUpdate => ${docToUpdate}`);
  try {
    const res = await validateYupSchema(isAbleToPublished, docToUpdate);
    if (res) return true;
    else return false;
  } catch (Err) {
    return Err;
  }
}
