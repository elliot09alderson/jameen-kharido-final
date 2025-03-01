import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      default: "agent",
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    tokenExpiry: { type: Date },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    whatsappNumber: {
      type: String,
      //   required: true,
    },
    myFlatAds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flat", // Reference the Flat model
      },
    ],
    myHomeAds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Home", // Reference the Home model
      },
    ],
    myShopAds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop", // Reference the Shop model
      },
    ],
    myLandAds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Land", // Reference the Land model
      },
    ],

    avatar: {
      type: String, // URL to the avatar image
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAccountDisabled: {
      type: Boolean,
      default: false,
    },
    connections: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Customer",
        },
      ],
      default: [],
    },
    clients: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Customer",
        },
      ],
      default: [],
    },
    documents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document", // Assuming your document model is named 'Document'
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Agent = mongoose.model("Agent", agentSchema);
