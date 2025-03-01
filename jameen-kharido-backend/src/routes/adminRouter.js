import {
  BlockedAgents,
  createAdmin,
  deleteAdmin,
  deleteAgentAd,
  editAdminDetails,
  getAdDetails,
  getAdminDeails,
  getAgent,
  getAllAgents,
  getAllBlockedAgents,
  getRequestedAds,
  getVerifiedAgents,
} from "../controllers/adminController.js";
import { app } from "../index.js";
import express from "express";
import { upload } from "../utils/multerConfig.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const adminRouter = express.Router();
/**
 *
 * READ
 *
 */

/**
 *
 * CREATE
 *
 */
adminRouter.post("/", upload.single("image"), createAdmin);
adminRouter.get("/me", authMiddleware.adminMiddleware, getAdminDeails);

adminRouter.put(
  "/",
  authMiddleware.adminMiddleware,
  upload.single("image"),
  editAdminDetails
);

/**
 *
 * DELETE
*
*/
adminRouter.delete("/", authMiddleware.adminMiddleware, deleteAdmin);

adminRouter.get(
  "/agents/verified",
  authMiddleware.adminMiddleware,
  getVerifiedAgents
);

adminRouter.get("/agents", authMiddleware.adminMiddleware, getAllAgents);
adminRouter.get("/agent/:id", authMiddleware.adminMiddleware, getAgent);

adminRouter.get("/ad/:id", authMiddleware.adminMiddleware, getAdDetails);

adminRouter.delete("/ad/:id", authMiddleware.adminMiddleware, deleteAgentAd);

adminRouter.get(
  "/agents/blocked",
  authMiddleware.adminMiddleware,
  getAllBlockedAgents
);

adminRouter.post(
  "/agents/blocked/:AgentId",
  authMiddleware.adminMiddleware,
  BlockedAgents
);








adminRouter.get("/ad/pending", authMiddleware.adminMiddleware, getRequestedAds);
