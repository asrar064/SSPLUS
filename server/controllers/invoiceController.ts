import { Request, Response } from "express"; 
import Invoice from "../models/InvoiceModel";
import Product from "../models/ProductModel";
import mongoose from "mongoose";

// Create an Invoice when a product is sold
export const createInvoice = async (req: Request, res: Response) => {
  const { productId: product, quantity, totalPrice, owner } = req.body;

  try {
    // Find the product by its ID to confirm its existence
    const foundProduct = await Product.findById(product);
    if (!foundProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create a new invoice for the sale
    const newInvoice = new Invoice({
      product,
      quantity,
      totalPrice,
      owner, // Set the owner (store admin or store entity)
    });

    await newInvoice.save(); // Save the invoice to the database

    res.status(201).json(newInvoice); // Return the created invoice
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get all invoices by owner
export const getInvoicesByOwner = async (req: Request, res: Response) => {
  const { owner } = req.params;

  try {
    // Find all invoices by the owner ID
    const invoices = await Invoice.find({ owner });

    if (!invoices || invoices.length === 0) {
      return res
        .status(404)
        .json({ message: "No invoices found for this owner" });
    }

    res.status(200).json(invoices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get an Invoice by ID
export const getInvoiceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id).populate("product"); // Populate product info if needed

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get this month's total revenue and total products sold
export const getMonthlyStoreStats = async (req: Request, res: Response) => {
    const { owner } = req.params; // Get owner ID from request parameters

    try {
      // Find all invoices by the owner ID
      const invoices = await Invoice.find({ owner });
  
      // Initialize total quantity and total revenue
      let totalQuantity = 0;
      let totalRevenue = 0;
  
      // Iterate through invoices and sum the quantities and total prices
      invoices.forEach(invoice => {
        totalQuantity += invoice.quantity;
        totalRevenue += invoice.totalPrice;
      });
  
      res.status(200).json({
        totalProductsSold: totalQuantity,
        totalRevenue,
      }); // Return the total quantity and total revenue
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
};
  
