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
    invoices.forEach((invoice) => {
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

// Get the invoice with the highest quantity sold and the product name
export const getTopSellingProduct = async (req: Request, res: Response) => {
  const { id: owner } = req.params; // Get owner ID from request parameters

  try {
    // Find the invoice with the highest quantity sold for the given owner and populate the product details
    const highestInvoice = await Invoice.findOne({
      owner: new mongoose.Types.ObjectId(owner),
    })
      .sort({ quantity: -1 }) // Sort by quantity in descending order
      .limit(1) // Limit the result to one invoice
      .populate("product"); // Populate the product field and return only the name

    // console.log(highestInvoice)

    // If no invoice is found, return a 200 response with a message
    if (!highestInvoice) {
      return res.status(200).json({
        message: "No invoices found for this owner",
        invoice: null,
      });
    }

    // Return the invoice with the highest quantity sold and the product name
    return res.status(200).json({
      totalSold: highestInvoice?.quantity,
      topProductName:
        (highestInvoice.product as any)?.name || "Unknown product", // Safeguard if product is not found
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get the lowest-selling product by looking at the invoices
export const getLowestSellingProduct = async (req: Request, res: Response) => {
  const { id: owner } = req.params; // Get owner ID from request parameters

  try {
    // Aggregate invoices by product and sum the quantities sold for the given owner
    const productSales = await Invoice.aggregate([
      {
        $match: { owner: new mongoose.Types.ObjectId(owner) }, // Match invoices of the owner using ObjectId
      },
      {
        $group: {
          _id: "$product", // Group by product ID
          totalSold: { $sum: "$quantity" }, // Sum the quantities sold
        },
      },
      {
        $sort: { totalSold: 1 }, // Sort by totalSold in ascending order to get the lowest-selling product
      },
      {
        $limit: 1, // Only return the lowest-selling product
      },
    ]);

    // If no invoices are found, return a 200 response with a message
    if (productSales.length === 0) {
      return res.status(200).json({
        message: "No invoices found for this owner",
        lowestProductName: null,
        totalSold: 0,
      });
    }

    // Get the product ID of the lowest-selling product
    const lowestProductId = productSales[0]._id;

    // Find the product name from the Product model using the product ID
    const lowestProduct = await Product.findById(lowestProductId);

    // If product is not found in the Product collection
    if (!lowestProduct) {
      return res.status(200).json({
        message: "Lowest-selling product not found in the product collection",
        totalSold: productSales[0].totalSold,
      });
    }

    // Return the lowest-selling product name and total sold
    return res.status(200).json({
      lowestProductName: lowestProduct.name,
      totalSold: productSales[0].totalSold,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get the number of weekly purchases for a specific owner
export const getWeeklyPurchases = async (req: Request, res: Response) => {
  const { id: ownerId } = req.params; // Get ownerId from the request params

  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ message: "Invalid owner ID" });
  }

  try {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Get the start of the current week

    const invoices = await Invoice.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(ownerId), // Filter by owner ID
          createdAt: { $gte: startOfWeek }, // Only invoices from this week
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }, // Group by day
          },
          totalQuantity: { $sum: "$quantity" }, // Sum up quantities per day
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date ascending
      },
    ]);

    res.status(200).json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
