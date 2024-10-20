// controllers/storeAdminController.ts
import { Request, Response } from "express";
import StoreAdmin from "../models/StoreAdminModel";
import GmailTransporter from "../mailers/GoogleMailTransporter";

export const signupStoreAdmin = async (req: Request, res: Response) => {
  const { name, email, password, storeName, phone, storeAddress } = req.body;

  const newStoreAdmin = new StoreAdmin({
    name,
    email,
    password,
    storeName,
    phone,
    storeAddress,
  });
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

export const ResetPasswordWithQuestion = async (
  req: Request,
  res: Response
) => {
  const { email, storeAddress, newPassword } = req.body;

  try {
    // Find store admin by email
    const storeAdmin = await StoreAdmin.findOne({ email });
    if (!storeAdmin) {
      return res.status(404).json({ message: "Store admin not found" });
    }

    // Check if the storeAddress matches
    if ((storeAdmin as any).storeAddress != storeAddress) {
      // console.log((storeAdmin as any).storeAddress, storeAddress)
      return res.status(401).json({ message: "Store location does not match" });
    }

    // Update the password
    storeAdmin.password = newPassword;
    await storeAdmin.save();

    res.status(200).json(storeAdmin);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const SendEmailForLowStock = async (req: Request, res: Response) => {
  const { store, lowStockItemsCount } = req.body;

  try {
    if (store && lowStockItemsCount) {
      const mailData = {
        from: "nemesisss112@gmail.com",
        to: store.email,
        subject: `Low Stock Alert!`,
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #121212; color: #ffffff; padding: 40px; border-radius: 10px; max-width: 600px; margin: auto;">
            <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://stocksenseapp.vercel.app/logo-rect.png" alt="StockSense Logo" style="max-width: 150px;">
            </div>

            <h2 style="color: #76c7c0; text-align: center;">Low Stock Alert for ${store.name}</h2>

            <p style="font-size: 18px; color: #e0e0e0; line-height: 1.6;">
                We wanted to inform you that <span style="background-color: #ffeb3b; color: #000; padding: 5px 10px; border-radius: 5px;">
                <strong>${lowStockItemsCount}</strong></span> item(s) in your inventory are running low. Please review these items and restock as needed to ensure smooth operations.
            </p>

            <div style="text-align: center; margin-top: 30px;">
                <a href="https://stocksenseapp.vercel.app/store" 
                   style="font-size: 18px; background-color: #76c7c0; color: #121212; text-decoration: none; padding: 15px 25px; border-radius: 8px; font-weight: bold;">
                    View Inventory
                </a>
            </div>

            <p style="font-size: 16px; color: #b0b0b0; line-height: 1.5; margin-top: 40px;">
                Should you have any concerns or require assistance, please feel free to contact our customer service team. We are always here to help and ensure your experience with StockSense is seamless.
            </p>

            <p style="font-size: 16px; color: #b0b0b0; line-height: 1.5;">
                Thank you for choosing StockSense to manage your inventory needs. We appreciate your trust in us.
            </p>

            <h3 style="text-align: center; color: #76c7c0; margin-top: 40px;">The StockSense Team ✌</h3>
        </div>
    `,
      };

      GmailTransporter.sendMail(mailData, (err) => {
        if (err) {
          console.log(
            `Error sending Low Stock Alert mail to ${store.email}, ${err}`
          );
        } else {
          console.log("Low Stock Alert Email Sent!");
          res
            .status(200)
            .json({ message: "Email alert was sent successfully" });
        }
      });
    }
  } catch (error: any) {}
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
