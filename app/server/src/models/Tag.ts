import { Document, model, Schema } from 'mongoose';
import { ErrorResponse } from '../lib/utils';

export interface TagDocument extends Document {
  title: String;
}

const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Tag title is required'],
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
    next(
      ErrorResponse(400, {
        title: `${doc.title || 'This tag'} already present.`,
      })
    );
  } else {
    next(error);
  }
});

const Tag = model<TagDocument>('Tag', tagSchema);

export default Tag;
