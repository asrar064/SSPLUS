// routes/storeAdminRoutes.ts
import express from "express";
import {
    signupStoreAdmin,
    loginStoreAdmin,
    editProfile,
    getStoreAdmins,
    deleteStoreAdmin
} from "../controllers/storeAdminController";

const storeAdminRoutes = express.Router();

// Route to signup a new StoreAdmin
storeAdminRoutes.post("/signup", signupStoreAdmin);

// Route to login a StoreAdmin
storeAdminRoutes.post("/login", loginStoreAdmin);

// Route to edit a StoreAdmin's profile
storeAdminRoutes.put("/editProfile/:id", editProfile);

// Route to get all StoreAdmins
storeAdminRoutes.get("/", getStoreAdmins);

// Route to delete a StoreAdmin by ID
storeAdminRoutes.delete("/:id", deleteStoreAdmin);

export default storeAdminRoutes
