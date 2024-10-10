export interface ProductProps {
  _id?: string; // Unique ID of the product
  name: string; // Name of the product
  qrNumber: string; // Unique QR code for the product
  price: number; // Price of the product
  demandInMonth: string; // Array of months indicating demand (format: YYYY-MM)
  expiryDate: string; // Expiry date of the product
  owner: string | undefined;
  category: string; // Refers to the category ID
  picture?: string; // Path to the product image
  quantity: number; // Available quantity of the product
  gst: number; // Available quantity of the product
  createdAt?: Date; // Timestamp of when the product was created
}
