import express, { json, urlencoded } from "express";
import connectDB from "./db/config.db";
import cors from "cors";
import storeAdminRoutes from "./routes/storeAdminRoutes";
import monthlyStoreSalesRoutes from "./routes/montlyStoreSalesRoutes";
import path from "path"; // Import path to handle file paths
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Mongoose Server
connectDB();

// Use CORS for CROSS ORIGIN REQUESTS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://s-sense.vercel.app", "*"], // list your frontend URLs
  })
);

// Middleware Functions
app.use(json({ limit: "5mb" }));
app.use(urlencoded({ extended: false, limit: "5mb" }));

// ROUTES
app.use("/api/v1/storeAdmin", storeAdminRoutes);
app.use("/api/v1/monthlyStoreSales", monthlyStoreSalesRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);

// Serve static files (images) from 'static' directory
app.use("/", express.static(path.join(__dirname, "static")));
// ex -> http://localhost:3000/Electronics_ZERO1726587336870.png

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
