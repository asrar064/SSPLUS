import mongoose, { Document, Schema } from "mongoose";

interface IInvoice extends Document {
  product: mongoose.Schema.Types.ObjectId; // Reference to the product sold
  quantity: number; // Quantity sold
  totalPrice: number; // Total price for the sale
  owner: string; // Reference to the owner (StoreAdmin or Store entity)
  createdAt: Date; // Timestamp of when the invoice was created
}

const invoiceSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StoreAdmin",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model<IInvoice>("Invoice", invoiceSchema);

export default Invoice;
