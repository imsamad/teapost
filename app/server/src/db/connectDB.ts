import mongoose from 'mongoose';
import 'colors';
const connectDB = (setOptions = false) =>
  new Promise((resolve, reject) => {
    const mongoUri = process.env.MONGODB_URI!;
    const oneMin = 1000 * 60;
    const options = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: oneMin * 5, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: oneMin * 5, // Close sockets after 45 seconds of inactivity
    };
    mongoose.connect(mongoUri, setOptions ? options : {});

    const db = mongoose.connection;

    db.on('connected', () => {
      resolve(true);
      console.log(`):- MongoDB connected successfully!`.blue.italic);
    });

    db.on('error', (err) => {
      reject(false);
      console.log(`\n):- ${err.message}`.red.underline.bold);
    });

    db.on('disconnected', () => {
      reject(false);
      console.log(
        `\n):- MongoDB connection is disconnected...`.red.underline.bold
      );
    });

    const closeDB = () =>
      db.close(() => {
        console.log(
          `):- MongoDB is disconnecting due to node app exit...`.red.underline
            .bold
        );
        process.exit(0);
      });

    process.on('SIGINT', closeDB);
    process.on('exit', closeDB);
    process.on('beforeExit', closeDB);
  });

export default connectDB;
