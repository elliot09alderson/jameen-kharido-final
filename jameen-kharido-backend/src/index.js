import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { customerRouter } from "./routes/customerRouter.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRouter.js";
import { agentRouter } from "./routes/agentRouter.js";
import { AdRouter } from "./routes/ADRouter.js";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { adminRouter } from "./routes/adminRouter.js";
// import multer from "multer";

// app.use(cors({ origin: "*" }));
export const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.2:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Required for cookies
  })
);
app.use(express.json());
dotenv.config({ path: "./src/.env" });
app.use(cookieParser());
export const upload = multer({
  dest: "uploads/",
});

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

connectDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customer", customerRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/agent", agentRouter);
app.use("/api/v1/ad", AdRouter);

app.use(
  "/api/v1/auth/verify",
  authMiddleware.customerMiddleware,
  (req, res) => {
    res.status(200).json({ user: req.user });
  }
);

app.listen(4000, "0.0.0.0", () => console.log("port is running on 4k"));
