import mongoose, { Query } from 'mongoose';
import ErrorResponse from '../utils/ErrorResponse';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  role: string | 'admin' | 'reader' | 'author';
  matchPassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
      minlength: [5, "Username's minimum length must be 5."],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, "Password's minimum length must be 6."],
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'reader', 'author'],
      default: 'reader',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Do sth here bcoz ,sth might be missing.
userSchema.post<Query<UserDocument, UserDocument>>(
  'save',
  function (error: any, doc: UserDocument, next: any) {
    if (error?.code === 11000) {
      console.log('Executed');
      next(
        ErrorResponse(400, {
          email: `${doc.email || 'This email'} already registered.`,
        })
      );
    } else {
      next(error);
    }
  }
);

userSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  if (!user.isModified('password')) return next();

  const saltFactor: number = Number(process.env.SALT_FACTOR) || 10;

  const salt = await bcrypt.genSalt(saltFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.matchPassword = async function (
  enterPassword: UserDocument['password']
) {
  return await bcrypt.compare(enterPassword, this.password);
};
const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
