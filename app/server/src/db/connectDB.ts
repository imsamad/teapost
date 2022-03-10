import mongoose from "mongoose";

const connectDB = (mongoUriConnect?: string) => {
  const mongoUri = mongoUriConnect ? mongoUriConnect : process.env.MONGO_URI;

  // @ts-ignore
  mongoose.connect(mongoUri);

  mongoose.connection.on("connected", () => {
    console.log("Mongoose DB connected!");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected...");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose connection is disconnected due to app termination..."
      );
      process.exit(0);
    });
  });
};

export default connectDB;
