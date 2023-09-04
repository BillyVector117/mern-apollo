import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectToDB = async () => {
    try {
        mongoose.set("strictQuery", false)
        const connection = await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB: ', connection.connection.name)
    } catch (error) {
        console.log('error:', error)
        process.exit(1) // 1 = error, 0 = OK
    }
}