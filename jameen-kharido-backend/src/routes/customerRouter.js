import {
  createCustomer,
  deactivateCustomer,
  editCustomerDetails,
  fetchAdByCategory,
  fetchAdDetail,
  fetchApprovedAds,
  fetchApprovedHomeAds,
  getCustomerDetails,
} from "../controllers/customerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { upload } from "../utils/multerConfig.js";
import express from "express";

export const customerRouter = express.Router();

customerRouter.get("/home-ads", fetchApprovedHomeAds);
customerRouter.get("/ads", fetchApprovedAds);

customerRouter.get("/ad/detail", fetchAdDetail);
customerRouter.get("/ads/:catname", fetchAdByCategory);

customerRouter.get(
  "/me",
  authMiddleware.customerMiddleware,
  getCustomerDetails
);

/**
 *
 * CREATE
 *
 */
customerRouter.post("/", upload.single("image"), createCustomer);

/**
 *
 * UPDATE
 *
 */
customerRouter.put("/", authMiddleware.customerMiddleware, editCustomerDetails);

/**
 *
 * DELETE
 *
 */
customerRouter.delete(
  "/",
  authMiddleware.customerMiddleware,
  deactivateCustomer
);
