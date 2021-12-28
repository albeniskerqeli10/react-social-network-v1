import mongoose, { ConnectOptions } from "mongoose";

// initialize mongoose and connect to db
const connectDb = async () => {
  try {
    // connect to mongodb 🎉
    const conn = await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions )
      console.log("Connected to MongoDB" , conn.connection.host);

   
  } catch (err) {
    err;
  }
};

export default connectDb;
