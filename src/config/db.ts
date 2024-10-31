import mongoose from "mongoose";
import config from "./config";

async function connectDB() {
    mongoose.connection.on("connected", () => {
        console.log("Connected to database");
    });
    mongoose.connection.on("error", (error) => {
        console.error("Error connecting to database", error);
        process.exit(1);
    });
    await mongoose.connect(`${config.mongodb.connection_string as string}${config.mongodb.db_name}`);
    // const connection_object = await mongoose.connect(`${config.mongodb.connection_string as string}${config.mongodb.db_name}`);
    // console.log("connection_object", connection_object);
}

export default connectDB;