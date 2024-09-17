// models/Category.ts
import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
    name: string; // The name of the category
    owner: string; // The owner of the category
    picture: string; // Path to the category's image file
    createdAt: Date; // Timestamp of when the category was created
}

const categorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true // Ensure category names are unique
    },
    owner: {
        type: String,
        required: true
    },
    picture: {
        type: String, // This could be a URL or a path to the image
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
