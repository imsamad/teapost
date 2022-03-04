import mongoose from 'mongoose';

const connectDB = () => {
  const isProd = process.env.NODE_ENV === 'production';

  const mongoUri: string = isProd
    ? (process.env.MONGO_URI as string)
    : (process.env.MONGO_URI_DEV as string);

  mongoose.connect(mongoUri);

  mongoose.connection.on('connected', () => {
    console.log('Mongoose DB connected!');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};

export default connectDB;
