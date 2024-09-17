import mongoose from "mongoose";

const dbUri = "mongodb+srv://mern-db:haseeb@cluster0.wwgpqqh.mongodb.net/StockSense"

const connectDB = async () => {
    try {
        mongoose.connect(dbUri).then(() => {
            console.log(`DB Connection ✅`);
          });
    } catch (error:any) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
