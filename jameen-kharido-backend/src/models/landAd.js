import mongoose from "mongoose";

const landAdSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    slug: { type: String, required: true, trim: true },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: { type: String, default: "land" },
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
      type: Number, // In square feet or acres
      required: true,
    },
    zoneType: {
      type: String,
      enum: ["Residential", "Commercial", "Agricultural"], // Restricts the values
      required: true,
    },

    roadAccess: {
      type: Boolean,
      default: false,
    },
    nearby: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Land = mongoose.model("Land", landAdSchema);
