import mongoose from "mongoose";

export default async function connectToDatabase() {
  try {
    // Replace 'your_database_url' with your actual MongoDB database URL
    const dbConnection = await mongoose.connect(
      process.env.MONGODB_CONNECTION_URI
    );

    console.log("Connected to the database");
    return dbConnection;
  } catch (error) {
    throw error;
  }
}
