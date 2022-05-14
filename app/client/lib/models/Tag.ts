import mongoose, { Document, Schema } from 'mongoose';

export interface TagDocument extends Document {
  title: String;
}

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'This tag already exist'],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

tagSchema.post('save', function (error: any, doc: TagDocument, next: any) {
  if (error?.code === 11000) {
    next({
      title: `${doc.title || 'This tag'} already present.`,
    });
  } else {
    next(error);
  }
});

const Tag = mongoose?.models?.Tag || mongoose.model('Tag', tagSchema);

export default Tag;
