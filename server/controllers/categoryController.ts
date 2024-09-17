// controllers/categoryController.ts
import { Request, Response } from "express";
import Category from "../models/CategoryModel";
import ProcessImage from "../utils/ProcessImage";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  const { name, owner, picture } = req.body;

  const processedImage = await ProcessImage(name, picture?.split(",")[1]);

  const newCategory = new Category({ name, owner, picture: processedImage });
  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, owner, picture } = req.body; // Allow updates to name, owner, and picture

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, owner, picture },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
