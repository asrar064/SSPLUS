// routes/categoryRoutes.ts
import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";

const categoryRoutes = express.Router();

// Route to create a new Category
categoryRoutes.post("/", createCategory);

// Route to get all Categories
categoryRoutes.get("/", getCategories);

// Route to update a Category by ID
categoryRoutes.put("/:id", updateCategory);

// Route to delete a Category by ID
categoryRoutes.delete("/:id", deleteCategory);

export default categoryRoutes;
