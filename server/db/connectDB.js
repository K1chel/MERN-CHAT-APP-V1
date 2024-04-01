import monogoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await monogoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.rainbow.bold);
  } catch (error) {
    console.log(`Error while connecting to DB: ${error.message}`);
    process.exit(1);
  }
};
