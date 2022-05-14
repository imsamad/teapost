import mongoose from 'mongoose';
import 'colors';
const connectDB = (mongoUriConnect?: string) => {
  const mongoUri = mongoUriConnect ? mongoUriConnect : process.env.MONGODB_URI;

  // @ts-ignore
  mongoose.connect(mongoUri);

  mongoose.connection.on('connected', () => {
    console.log(`):- Mongoose DB connected!`.blue.italic);
  });

  mongoose.connection.on('error', (err) => {
    console.log(`\n):- ${err.message}`.red.underline.bold);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(
      `\n):- Mongoose connection is disconnected...`.red.underline.bold
    );
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        `):- Mongoose connection is disconnected due to app termination...`.red
          .underline.bold
      );
      process.exit(0);
    });
  });
};

export default connectDB;
