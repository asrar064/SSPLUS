// routes/productRoutes.ts
import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductsByOwnerId,
  getProductsAddedToday,
  getLowStockProducts,
  getProductByQrNumber,
  subtractProductStock,
} from "../controllers/productController";

const productRoutes = express.Router();

// Route to create a new Product
productRoutes.post("/", createProduct); // Removed multer middleware

// Route to get all Products
productRoutes.get("/", getProducts);

// Route to get One Product by ID
productRoutes.get("/:id", getProductByQrNumber);

// Route to get One Product by ID
productRoutes.post("/sellProduct/:id", subtractProductStock);

// Route to get all Store's Products
productRoutes.get("/getProductsByOwnerId/:id", getProductsByOwnerId);

// Route to get all Store's Products Added Recently
productRoutes.get("/getProductsAddedToday/:id", getProductsAddedToday);

// Route to get all Store's Products which need Restocking
productRoutes.get("/getLowStockProducts/:id", getLowStockProducts);

// Route to update a Product by ID
productRoutes.put("/:id", updateProduct); // Removed multer middleware

// Route to delete a Product by ID
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
