import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGODB CONNECTED: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    // Exit process with failure so Render knows the service is unhealthy
    // process.exit(1); 
  }
};
