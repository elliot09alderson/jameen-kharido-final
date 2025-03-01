import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      default: "customer",
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      //   required: true,
      unique: true,
    },
    address: {
      type: String,
      //   required: true,
    },
    pincode: {
      type: String,
      //   required: true,
    },
    nearby: {
      type: String,
      //   required: true,
    },
    avatar: {
      type: String, // URL to the avatar image
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
    tokenExpiry: { type: Date },
    recentSearch: [
      {
        image: {
          type: String, // URL to the search image
          default: null,
        },
        query: {
          type: String, // Search term
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

export const Customer = mongoose.model("Customer", customerSchema);
