import { DB_URI } from "./env.config.js";
import mongoose from "mongoose";

if (!DB_URI) {
    throw new Error("DB_URI is not defined in environment variables");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

export default connectToDatabase;
