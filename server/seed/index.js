import User from "../models/user.model.js";
import { connectDB } from "../db/connectDB.js";
import "colors";
import "dotenv/config";

const main = async () => {
  try {
    await connectDB();
    await User.deleteMany();

    console.log("Data deleted successfully".green.inverse);
  } catch (error) {
    console.log(`Error in deleteData: ${error.message}`.red.bold);
  }
};

main();
