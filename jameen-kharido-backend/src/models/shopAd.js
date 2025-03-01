import mongoose from "mongoose";

const shopAdSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true, trim: true },

    description: {
      type: String,
      required: true,
    },
    type: { type: String, default: "shop" },
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
    floor: {
      type: Number,
      required: true,
    },
    furnished: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"], // Only these values are allowed
      required: true,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    nearby: {
      type: String, // Array of nearby landmarks or facilities
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Shop = mongoose.model("Shop", shopAdSchema);
