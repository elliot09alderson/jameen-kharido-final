import mongoose from "mongoose";

const flatAdSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, trim: true },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent", // Reference to the Agent model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    area: {
      type: Number, // In square feet
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      //   required: true,
    },
    totalFloors: {
      type: Number,
      //   required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    furnished: {
      enum: ["unfurnished", "furnished", "semifurnished"], // true for
    },
    amenities: {
      type: [String], // Array of amenities like elevator, water, parking, etc.
      default: [],
    },
    type: { type: String, default: "flat" },
    age: {
      type: Number, // Age of the flat in years
      //   required: true,
    },
    maintenance: {
      type: Number, // Maintenance fees per month
      //   required: true,
    },
    nearby: {
      type: String, // Array of nearby landmarks or facilities
      default: "",
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
  },
  { timestamps: true }
);

export const Flat = mongoose.model("Flat", flatAdSchema);
