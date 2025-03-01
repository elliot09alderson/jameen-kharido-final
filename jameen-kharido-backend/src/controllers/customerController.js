import { z } from "zod";
import { Customer } from "../models/customer.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import multer from "multer";
import bcrypt from "bcryptjs";
import { unlink } from "fs/promises";
import { Home } from "../models/homeAd.js";
import { Flat } from "../models/flatAd.js";
import { Land } from "../models/landAd.js";
import { Shop } from "../models/shopAd.js";
import { error } from "console";
const customerSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  address: z.string().optional(), // Address is optional
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" }),
});

const optionalCustomerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email format" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
  address: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits" })
    .optional(),
  image: z
    .object({
      mimetype: z.string().regex(/^image\/(jpeg|png|gif|webp)$/, {
        message: "Only JPEG, PNG, GIF, or WEBP images are allowed",
      }),
      size: z
        .number()
        .max(5 * 1024 * 1024, { message: "Image size must not exceed 5MB" }),
    })
    .optional(),
});

export async function getCustomerDetails(req, res) {
  const { id } = req.customer;

  try {
    const get = await Customer.findById(id);
    console.log(get);
    return res.status(200).send({
      success: true,
      get,
      message: "get customer",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "customer not get" });
  }
}
export async function fetchApprovedHomeAds(req, res) {
  try {
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const allAds = await Home.aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          location: 1,
          slug: 1,
          area: 1,
          thumbnail: { $arrayElemAt: ["$images", 0] },
          price: 1,
          type: "Home",
        },
      },
      {
        $unionWith: {
          coll: "flats",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                location: 1,
                slug: 1,
                thumbnail: { $arrayElemAt: ["$images", 0] },
                price: 1,
                area: 1,
                type: "Flat",
              },
            },
          ],
        },
      },
      {
        $unionWith: {
          coll: "shops",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                location: 1,
                slug: 1,
                area: 1,
                thumbnail: { $arrayElemAt: ["$images", 0] },
                price: 1,
                type: "Shop",
              },
            },
          ],
        },
      },
      {
        $unionWith: {
          coll: "lands",
          pipeline: [
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                location: 1,
                slug: 1,
                area: 1,
                thumbnail: { $arrayElemAt: ["$images", 0] },

                price: 1,
                type: "Land",
              },
            },
          ],
        },
      },
    ]);

    // Shuffle the combined array of documents
    const shuffledAds = shuffleArray(allAds);

    return res.status(200).json({
      success: true,
      data: shuffledAds,
      message: "all ads fetched",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "customer not get" });
  }
}

export async function fetchApprovedAds(req, res) {
  try {
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const allAds = await Home.aggregate([
      {
        $unionWith: {
          coll: "flats",
        },
      },
      {
        $unionWith: {
          coll: "shops",
        },
      },
      {
        $unionWith: {
          coll: "lands",
        },
      },
    ]);

    // Shuffle the combined array of documents
    const shuffledAds = shuffleArray(allAds);

    return res.status(200).json({
      success: true,
      data: shuffledAds,
      message: "all ads fetched",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "customer not get" });
  }
}

export async function fetchAdDetail(req, res) {
  const { slug, type } = req.query;

  if (!slug || !type) {
    return res
      .status(400)
      .json({ error: "Missing slug or type in query parameters" });
  }
  const xtype = type.toUpperCase();

  const models = {
    HOME: Home,
    LAND: Land,
    SHOP: Shop,
    FLAT: Flat,
  };

  const Model = models[xtype];

  if (!Model) {
    return res.status(400).json({ error: "Invalid type provided" });
  }

  try {
    const adDetail = await Model.findOne({ slug });

    if (!adDetail) {
      return res.status(404).json({ error: "Ad not found" });
    }

    res.json({ success: true, adDetail: adDetail });
  } catch (error) {
    console.error("Error fetching ad detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function fetchAdByCategory(req, res) {
  const { catname } = req.params;

  const models = {
    HOME: Home,
    LAND: Land,
    SHOP: Shop,
    FLAT: Flat,
  };

  const Model = models[catname.toUpperCase()];

  if (!Model) {
    return res.status(400).json({ error: "Invalid type provided" });
  }

  try {
    const ads = await Model.find({
      isApproved: false,
    });

    if (!ads) {
      return res.status(404).json({ error: "Ad not found" });
    }

    res.json({
      success: true,
      data: ads,
      message: `${catname} ads fetched successfully`,
    });
  } catch (error) {
    console.error("Error fetching ad detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function createCustomer(req, res) {
  const { name, email, password, address, phoneNumber } = req.body;

  const parsed = customerSchema.safeParse({
    name,
    email,
    password,
    address,
    phoneNumber,
  });
  const isPresent = await Customer.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (isPresent) {
    return res
      .status(409)
      .json({ error: "Email or phone number already exists" });
  }

  let file = req.file;
  console.log(file);

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    let result = "";
    if (file) {
      result = await cloudinary.uploader.upload(file?.path, {
        folder: "jameen_kharido",
        resource_type: "raw",
        transformation: cropParams,
      });
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error("Error deleting the file:", err);
        } else {
          console.log("File deleted successfully:", file.path);
        }
      });
    }
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: "invalid input",
      });
    }

    const encryptedPass = await bcrypt.hash(parsed.data.password, 10);

    parsed.data.password = encryptedPass;

    const customer = await Customer.create({
      ...parsed.data,
      avatar: result.url || "",
    });

    if (customer) {
      return res.status(201).json({
        success: true,
        message: "customer registered successfully",
        customer,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function editCustomerDetails(req, res) {
  const customerid = req.customer._id;
  console.log("Customer ID:", customerid);

  try {
    const { name, email, password, address, phoneNumber } = req.body;

    let image = req.files?.image
      ? {
          mimetype: req.files.image.mimetype,
          size: req.files.image.size,
        }
      : undefined;

    // Validate input data with zod
    const parsed = optionalCustomerSchema.safeParse({
      name,
      email,
      password,
      address,
      phoneNumber,
    });

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    req.validatedBody = parsed.data;

    // If an image is provided, upload to Cloudinary
    if (image) {
      const cropParams = {
        width: 300,
        height: 300,
        crop: "crop",
        gravity: "auto",
      };

      console.log("Starting image upload...");

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(image.filepath, {
        folder: "profile",
        transformation: cropParams,
      });

      console.log("Image upload complete.");

      // Get the image URL after upload
      image = result?.url;
      console.log("Uploaded Image URL:", image);
    }

    // Prepare the updated data (name, email, password, etc. along with image URL)
    const updatedData = {
      ...parsed.data, // existing validated data
      avatar: image, // newly uploaded image URL (if available)
    };

    console.log("Updated Data:", updatedData);

    // Update the customer document
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerid, // Use customerid directly here
      updatedData, // Spread the updated data directly
      { new: true, runValidators: true } // Ensure that validation happens during the update
    );

    if (updatedCustomer) {
      return res.status(200).json({
        success: true,
        message: "Data updated successfully",
        data: updatedCustomer,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
  } catch (error) {
    console.log("Error in updating customer:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
export async function deactivateCustomer(req, res) {
  const customerid = req.customer._id;

  try {
    // If an image is provided, upload to Cloudinary

    // Update the customer document
    const deleteCustomer = await Customer.findByIdAndDelete(customerid);

    if (deleteCustomer) {
      return res.status(200).json({
        success: true,
        message: "Customer Delete successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
  } catch (error) {
    console.log("Error in updating customer:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
