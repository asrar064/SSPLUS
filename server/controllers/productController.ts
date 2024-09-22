import { Request, Response } from "express";
import Product from "../models/ProductModel";
import ProcessImage from "../utils/ProcessImage";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    qrNumber,
    price,
    demandInMonths,
    expiryDate,
    category,
    quantity,
    picture,
    owner,
  } = req.body;

  const processedImage = await ProcessImage(name, picture?.split(",")[1]);

  const newProduct = new Product({
    name,
    qrNumber,
    price,
    demandInMonths,
    expiryDate,
    category,
    picture: processedImage, // Send Base64 Image Format
    quantity,
    owner, // Reference to the owner (Store Admin)
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get Products by Owner ID
export const getProductsByOwnerId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find products that match the given ownerId
    const products = await Product.find({ owner: id });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this owner" });
    }

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// Get Products Added Today
export const getProductsAddedToday = async (req: Request, res: Response) => {
  const { id } = req.params; // Get owner ID from request parameters
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    const products = await Product.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      owner: id, // Filter by owner ID
    });

    // Return an empty array if no products found
    res.status(200).json(products || []);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get Products with Quantity Less Than 5
export const getLowStockProducts = async (req: Request, res: Response) => {
  const { id } = req.params; // Get owner ID from request parameters

  try {
    const products = await Product.find({
      quantity: { $lt: 5 },
      owner: id, // Filter by owner ID
    });

    // Return an empty array if no low stock products found
    res.status(200).json(products || []);
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
  const {
    name,
    qrNumber,
    price,
    demandInMonths,
    expiryDate,
    category,
    quantity,
    picture,
  } = req.body; // Accept picture in the request

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        qrNumber,
        price,
        demandInMonths,
        expiryDate,
        category,
        picture,
        quantity,
      },
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
