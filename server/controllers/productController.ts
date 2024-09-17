// controllers/productController.ts
import { Request, Response } from "express";
import Product from "../models/ProductModel";
import ProcessImage from "../utils/ProcessImage";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
    const { name, qrNumber, price, demandInMonths, expiryDate, category, quantity, picture } = req.body;

    const processedImage = await ProcessImage(
        name,
        picture?.split(",")[1]
      );

    const newProduct = new Product({ 
        name, 
        qrNumber, 
        price, 
        demandInMonths, 
        expiryDate, 
        category, 
        picture: processedImage, // Send Base64 Image Format
        quantity 
    });

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Product
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, qrNumber, price, demandInMonths, expiryDate, category, quantity, picture } = req.body; // Accept picture in the request

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, qrNumber, price, demandInMonths, expiryDate, category, picture, quantity },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(updatedProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Product
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
