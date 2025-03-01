import mongoose from "mongoose";
const homeAdSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
    },
    type: { type: String, default: "home" },
    location: {
      type: String,
      required: true,
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
    parking: {
      type: Boolean,
      default: false,
    },
    slug: { type: String, required: true, trim: true },

    garden: {
      type: Boolean,
      default: false,
    },
    amenities: {
      type: [String],
      default: [],
    },
    furnished: {
      type: String,
      enum: ["unfurnished", "furnished", "semifurnished"], // true for
    },
    nearby: {
      type: String, // Array of nearby landmarks or facilities
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Home = mongoose.model("Home", homeAdSchema);
