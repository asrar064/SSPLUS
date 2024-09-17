// models/MonthlyStoreSales.ts
import mongoose, { Document, Schema } from "mongoose";

interface IMonthlyStoreSales extends Document {
    ofMonth: string; // Format: YYYY-MM (e.g., "2023-10")
    totalRevenue: number; // Total revenue for the month
    totalProductsSold: number; // Total number of products sold
    ofStore: string; // Reference to the StoreAdmin or store entity
    createdAt: Date; // Timestamp of when the record was created
}

const monthlyStoreSalesSchema: Schema = new Schema({
    ofMonth: {
        type: String,
        required: true
    },
    totalRevenue: {
        type: Number,
        required: true
    },
    totalProductsSold: {
        type: Number,
        required: true
    },
    ofStore: {
        type: String,
        required: true // Assuming this references a StoreAdmin's ID
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const MonthlyStoreSales = mongoose.model<IMonthlyStoreSales>("MonthlyStoreSales", monthlyStoreSalesSchema);

export default MonthlyStoreSales;
