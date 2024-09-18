// models/StoreAdmin.ts
import mongoose, { Document, Schema } from "mongoose";

interface IStoreAdmin extends Document {
    name: string;
    email: string;
    password: string;
    storeName: string;
    phone: string;
    createdAt: Date;
}

const storeAdminSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    storeAddress: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const StoreAdmin = mongoose.model<IStoreAdmin>("StoreAdmin", storeAdminSchema);

export default StoreAdmin;
