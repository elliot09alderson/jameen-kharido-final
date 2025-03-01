import {
  deleteFlatAd,
  deleteHomeAd,
  deleteLandAd,
  deleteShopAd,
  editFlatAd,
  editHomeAd,
  editLandAd,
  editShopAd,
  getAllFlatAds,
  getAllHomeAds,
  getAllLandAds,
  getAllShopAds,
  postFlatAd,
  postHomeAd,
  postLandAd,
  postShopAd,
} from "../controllers/adController.js";
// import { app } from "../index.js";

import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/multerConfig.js";

export const AdRouter = express.Router();
/**
 *
 * READ
//  *
//  */

AdRouter.get("/homes", getAllHomeAds);
AdRouter.get("/flats", getAllFlatAds);
AdRouter.get("/lands", getAllLandAds);
AdRouter.get("/shops", getAllShopAds);

// find by agent...

// /**
//  *
//  * CREATE
//  *
//  */

AdRouter.post(
  "/home",
  authMiddleware.agentMiddleware,
  upload.array("images", 5),
  postHomeAd
);

AdRouter.post(
  "/flat",
  authMiddleware.agentMiddleware,
  upload.array("flatsAdImages", 5),
  postFlatAd
);

AdRouter.post(
  "/land",
  authMiddleware.agentMiddleware,
  upload.array("landsAdImages", 5),
  postLandAd
);

AdRouter.post(
  "/shop",
  authMiddleware.agentMiddleware,
  upload.array("shopsAdImages", 5),
  postShopAd
);

// /**
//  *
//  * UPDATE
//  *
//  */

AdRouter.put(
  "/homes/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editHomeAd
);

AdRouter.put(
  "/flats/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editFlatAd
);
AdRouter.put(
  "/lands/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editLandAd
);
AdRouter.put(
  "/shops/:homeAdId",
  authMiddleware.agentMiddleware,
  upload.array("homeAdImages", 5),
  editShopAd
);

// /**
//  *
//  * DELETE
//  *
//  */

AdRouter.delete(
  "/homes/:homeAdId",
  authMiddleware.agentMiddleware,
  deleteHomeAd
);

AdRouter.delete(
  "/flats/:flatAdId",
  authMiddleware.agentMiddleware,
  deleteFlatAd
);

AdRouter.delete(
  "/lands/:landAdId",
  authMiddleware.agentMiddleware,
  deleteLandAd
);
AdRouter.delete(
  "/shops/:shopAdId",
  authMiddleware.agentMiddleware,
  deleteShopAd
);
