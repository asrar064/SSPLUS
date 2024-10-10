// models/Product.ts
import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  name: string; // Name of the product
  qrNumber: string; // Unique QR code for the product
  price: number; // Price of the product
  demandInMonth: string; // Array of months indicating demand (format: YYYY-MM)
  expiryDate: Date; // Expiry date of the product
  category: string; // Refers to the category ID
  picture?: string; // Path to the product image
  quantity: number; // Available quantity of the product
  gst: number; // gst % of the product
  createdAt: Date; // Timestamp of when the product was created
}

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure product names are unique
  },
  qrNumber: {
    type: String,
    required: true,
    unique: true, // Ensure QR numbers are unique
  },
  price: {
    type: Number,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  demandInMonth: {
    type: String, // Array of strings for months
    default: "",
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true, // This should reference a Category ID
  },
  picture: {
    type: String, // This could be a URL or a path to the image
    required: false, // This field is optional
  },
  quantity: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
