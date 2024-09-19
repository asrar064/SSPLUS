// controllers/storeAdminController.ts
import { Request, Response } from "express";
import StoreAdmin from "../models/StoreAdminModel";

export const signupStoreAdmin = async (req: Request, res: Response) => {
    const { name, email, password, storeName, phone, storeAddress } = req.body;

    const newStoreAdmin = new StoreAdmin({ name, email, password, storeName, phone, storeAddress });
    try {
        await newStoreAdmin.save();
        res.status(201).json(newStoreAdmin);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const loginStoreAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const storeAdmin = await StoreAdmin.findOne({ email });
        if (!storeAdmin || storeAdmin.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", storeAdmin });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const editProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, phone, storeName } = req.body;
    
    try {
        const updatedStoreAdmin = await StoreAdmin.findByIdAndUpdate(
            id,
            { name, email, phone, storeName },
            { new: true }
        );
        if (!updatedStoreAdmin) {
            return res.status(404).json({ message: "Store admin not found" });
        }
        res.status(200).json(updatedStoreAdmin);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getStoreAdmins = async (req: Request, res: Response) => {
    try {
        const storeAdmins = await StoreAdmin.find();
        res.status(200).json(storeAdmins);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteStoreAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        await StoreAdmin.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
