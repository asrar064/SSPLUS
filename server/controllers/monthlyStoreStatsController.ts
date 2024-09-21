import { Request, Response } from "express";
import MonthlyStoreSales from "../models/MonthlyStoreSalesModel";

// Create Monthly Store Sales record
export const createMonthlyStoreSales = async (req: Request, res: Response) => {
    const { ofMonth, totalRevenue, totalProductsSold, ofStore } = req.body;
    const newSalesRecord = new MonthlyStoreSales({ ofMonth, totalRevenue, totalProductsSold, ofStore });
    
    try {
        await newSalesRecord.save();
        res.status(201).json(newSalesRecord);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Monthly Store Sales records
export const getMonthlyStoreSales = async (req: Request, res: Response) => {
    try {
        const salesRecords = await MonthlyStoreSales.find();
        res.status(200).json(salesRecords);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Sales Record by Store ID and create if not found
export const getSalesRecordById = async (req: Request, res: Response) => {
    const { id } = req.params; // Store Admin ID

    try {
        // Search for a sales record with the store ID
        let salesRecord = await MonthlyStoreSales.findOne({ ofStore: id });

        // If no record is found, create one
        if (!salesRecord) {
            // Default sales data
            salesRecord = new MonthlyStoreSales({
                ofMonth: new Date().getMonth() + 1,  // Current month
                totalRevenue: 0,
                totalProductsSold: 0,
                ofStore: id,
            });

            await salesRecord.save(); // Save the new record
        }

        // Return the sales record (whether found or newly created)
        res.status(200).json(salesRecord);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Monthly Store Sales record
export const updateMonthlyStoreSales = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { totalRevenue, totalProductsSold } = req.body; // Allow updates to revenue and products sold

    try {
        const updatedRecord = await MonthlyStoreSales.findByIdAndUpdate(
            id,
            { totalRevenue, totalProductsSold },
            { new: true }
        );
        if (!updatedRecord) {
            return res.status(404).json({ message: "Monthly sales record not found" });
        }
        res.status(200).json(updatedRecord);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Monthly Store Sales record
export const deleteMonthlyStoreSales = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await MonthlyStoreSales.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
