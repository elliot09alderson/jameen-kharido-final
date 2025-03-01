import { z } from "zod";
import { Home } from "../models/homeAd.js";
import { v2 as cloudinary } from "cloudinary";
import { Flat } from "../models/flatAd.js";
import { Land } from "../models/landAd.js";
import { Shop } from "../models/shopAd.js";
import { generateSlug } from "../utils/function.js";
import fs from "fs";
import { Agent } from "../models/agent.js";

// Define the schema with file validation
const homePropertySchema = z.object({
  agentId: z.string().nonempty("Agent ID is required"),
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  pincode: z.number().optional(),
  location: z.string().nonempty("Location is required"),
  price: z.number().min(0, "Price must be a positive number"),
  area: z.number().min(0, "Area must be a positive number"),
  bedrooms: z.number().min(0, "Bedrooms must be a positive number"),
  bathrooms: z.number().min(0, "Bathrooms must be a positive number"),
  parking: z.boolean().default(false),
  garden: z.boolean().default(false),
  amenities: z.array(z.string()).default([]),
  nearby: z.string().default(""),
  files: z
    .array(
      z.object({
        originalname: z.string(),
        path: z.string(),
        size: z.number().max(5 * 1024 * 1024, "File size must be ≤ 5MB"), // 5MB max
      })
    )
    .optional(),
});

export const postHomeAd = async (req, res) => {
  const { id } = req.agent;

  const parseIfNumber = (value) => (isNaN(value) ? value : parseInt(value, 10));
  const parseIfBoolean = (value) =>
    typeof value === "string" ? value.toLowerCase() === "true" : Boolean(value);

  const {
    title,
    description,
    pincode,
    location,
    price,
    area,
    bedrooms,
    bathrooms,
    parking,
    garden,
    amenities,
    nearby,
  } = req.body;

  const parsed = homePropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    bedrooms: parseIfNumber(bedrooms),
    bathrooms: parseIfNumber(bathrooms),
    parking: parseIfBoolean(parking),
    garden: parseIfBoolean(garden),
    amenities,
    nearby,
    files: req.files || [],
  });

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.errors.map((err) => ({
        path: err.path,
        message: err.message,
      })),
    });
  }

  const files = req.files;
  console.log("files", files);
  const cropParams = {
    gravity: "auto", // Auto-detect best cropping area
    width: 1000, // Reduce resolution
    height: 1000, // Set height to ensure consistent dimensions
    crop: "fill", // Required for auto gravity
    quality: "auto:low", // Aggressive compression
  };

  try {
    const uploadResults = [];

    if (files) {
      for (const file of files) {
        try {
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`File ${file.originalname} exceeds 5MB limit`);
          }

          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "image",
            format: "jpg",
            quality: "auto:low",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting the file:", err);
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    const slug = generateSlug(parsed.data.title);

    const homeAd = await Home.create({
      ...parsed.data,
      images: uploadResults,
      slug,
    });

    await Agent.findByIdAndUpdate(
      id,
      { $push: { myHomeAds: homeAd._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: " home ad added successfully",
      data: homeAd,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const flatPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  pincode: z.number().optional(),
  price: z.number().positive("Price must be a positive number"),
  area: z.number().positive("Area must be a positive number"),
  bedrooms: z.number().positive("Bedrooms must be a positive number"),
  bathrooms: z.number().positive("Bathrooms must be a positive number"),
  floor: z.number().optional(),
  totalFloors: z.number().optional(),
  furnished: z.enum(["unfurnished", "furnished", "semifurnished"]).optional(),
  amenities: z.array(z.string()).optional().default(""),
  age: z.number().positive("Age must be a positive number").optional(),
  maintenance: z
    .number()
    .positive("Maintenance must be a positive number")
    .optional(),
  nearby: z.string().optional().default([]),
  images: z.array(z.string().url("Invalid URL")).optional().default([]),
});

export const postFlatAd = async (req, res) => {
  const { id } = req.agent;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    location,
    pincode,
    price,
    area,
    bedrooms,
    bathrooms,
    floor,
    totalFloors,
    furnished,
    amenities,
    age,
    maintenance,
    nearby,
  } = req.body;

  console.log(
    "this is fsdff",
    title,
    description,
    location,
    pincode,
    price,
    area,
    bedrooms,
    bathrooms,
    floor,
    totalFloors,
    furnished,
    amenities,
    age,
    maintenance,
    nearby
  );

  const parsed = flatPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    bedrooms: parseIfNumber(bedrooms),
    bathrooms: parseIfNumber(bathrooms),
    floor: parseIfNumber(floor),
    totalFloors: parseIfNumber(totalFloors),
    furnished,
    amenities,
    age: parseIfNumber(age),
    maintenance: parseIfNumber(maintenance),
    nearby,
  });

  const files = req.files;
  const cropParams = {
    gravity: "auto", // Auto-detect best cropping area
    width: 1000, // Reduce resolution
    height: 1000, // Set height to ensure consistent dimensions
    crop: "fill", // Required for auto gravity
    quality: "auto:low", // Aggressive compression
  };

  try {
    const uploadResults = [];

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "image",
            format: "jpg",
            quality: "auto:low",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const slug = generateSlug(parsed.data.title);

    const flatAd = await Flat.create({
      ...parsed.data,
      slug,
      images: uploadResults,
    });

    await Agent.findByIdAndUpdate(
      id,
      {
        $push: {
          myFlatAds: flatAd._id, // Replace `newAdId` with the ID you want to add
        },
      },
      { new: true } // Return the updated document
    );
    if (flatAd) {
      return res.status(201).json({
        success: true,
        message: "Agent flats Ad add successfully",
        data: flatAd,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const landPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required"), // Non-empty string
  description: z.string().min(1, "Description is required"), // Non-empty string
  location: z.string().min(1, "Location is required"), // Non-empty string
  pincode: z.number().int("Pincode must be an integer").optional(), // Optional integer
  price: z.number().positive("Price must be a positive number"), // Positive number
  area: z.number().positive("Area must be a positive number"), // Positive number
  zoneType: z
    .string()
    .min(1, "Zone Type is required")
    .refine(
      (value) => ["Residential", "Commercial", "Agricultural"].includes(value),
      "Zone Type must be 'Residential', 'Commercial', or 'Agricultural'"
    ), // Restricted string values
  roadAccess: z.boolean().default(false), // Boolean with default `false`
  nearby: z.string().optional().default([]), // Array of strings (default: empty array)
  images: z
    .array(z.string().url("Invalid URL for image"))
    .optional()
    .default([]), // Array of valid image URLs (default: empty array)
});

export const postLandAd = async (req, res) => {
  const { id } = req.agent;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    pincode,
    location,
    price,
    area,
    zoneType,
    roadAccess,
    nearby,
  } = req.body;

  // console.log("this is req.cody",req.body)

  const parsed = landPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    zoneType,
    roadAccess: parseIfBoolean(roadAccess),
    nearby,
  });

  const files = req.files;
  const cropParams = {
    gravity: "auto", // Auto-detect best cropping area
    width: 1000, // Reduce resolution
    height: 1000, // Set height to ensure consistent dimensions
    crop: "fill", // Required for auto gravity
    quality: "auto:low", // Aggressive compression
  };

  try {
    const uploadResults = [];
    console.log(files);

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "image",
            format: "jpg",
            quality: "auto:low",
            transformation: cropParams,
          });
          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const slug = generateSlug(parsed.data.title);

    const landAd = await Land.create({
      ...parsed.data,
      slug,
      images: uploadResults,
    });

    await Agent.findByIdAndUpdate(
      id,
      {
        $push: {
          myLandAds: landAd._id, // Replace `newAdId` with the ID you want to add
        },
      },
      { new: true } // Return the updated document
    );
    // console.log(homeAd)

    if (landAd) {
      return res.status(201).json({
        success: true,
        message: "Agent landsAd add successfully",
        data: landAd,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const shopPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates MongoDB ObjectId
  title: z.string().min(1, "Title is required"), // Non-empty string
  description: z.string().min(1, "Description is required"), // Non-empty string
  location: z.string().min(1, "Location is required"), // Non-empty string
  pincode: z.number().int("Pincode must be an integer").optional(), // Optional integer
  price: z.number().positive("Price must be a positive number"), // Positive number
  area: z.number().positive("Area must be a positive number"), // Positive number
  floor: z
    .number()
    .int("Floor must be an integer")
    .positive("Floor must be a positive number")
    .optional(), // Optional positive integer
  furnished: z.enum(
    ["Furnished", "Semi-Furnished", "Unfurnished"],
    "Invalid Furnished status"
  ), // Enum validation for furnished status
  parking: z.boolean().default(false), // Boolean with default `false`
  nearby: z.string().optional().default([]), // Optional field with a default empty array
  images: z
    .array(z.string().url("Invalid URL for image"))
    .optional()
    .default([]), // Array of valid image URLs
});
export const postShopAd = async (req, res) => {
  const { id } = req.agent;

  // Function to parse numbers and booleans
  const parseIfNumber = (value) => (isNaN(value) ? value : parseInt(value, 10));
  const parseIfBoolean = (value) =>
    typeof value === "string" ? value.toLowerCase() === "true" : Boolean(value);

  const {
    title,
    description,
    location,
    pincode,
    price,
    area,
    floor,
    furnished,
    parking,
    nearby,
  } = req.body;

  console.log(req.body);

  // Validate the incoming data using the Zod schema
  const parsed = shopPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    floor: parseIfNumber(floor),
    furnished,
    parking: parseIfBoolean(parking),
    nearby,
  });

  // Handle validation errors
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.errors.map((err) => ({
        path: err.path.join("."), // Flatten the path array
        message: err.message,
      })),
    });
  }

  // Process file uploads (if any)
  const files = req.files;
  const uploadResults = [];

  const cropParams = {
    gravity: "auto", // Auto-detect best cropping area
    width: 1000, // Reduce resolution
    height: 1000, // Set height to ensure consistent dimensions
    crop: "fill", // Required for auto gravity
    quality: "auto:low", // Aggressive compression
  };

  if (files && files.length > 0) {
    for (const file of files) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "agents",
          resource_type: "image",
          format: "jpg",  
          quality: "auto:low",
          transformation: cropParams,
        });
        uploadResults.push(result.secure_url);

        // Remove the file after upload
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          }
        });
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
      }
    }
  }

  const slug = generateSlug(parsed.data.title);

  try {
    // Create the shop ad in the database
    const shopAd = await Shop.create({
      ...parsed.data,
      slug,
      images: uploadResults,
    });

    // Update the agent with the new shop ad
    await Agent.findByIdAndUpdate(
      id,
      {
        $push: { myShopAds: shopAd._id }, // Add the new ad to the agent's ads list
      },
      { new: true } // Return the updated agent document
    );

    // Send the success response
    return res.status(201).json({
      success: true,
      message: "Agent shop ad added successfully",
      data: shopAd,
    });
  } catch (error) {
    console.error("Error during ad creation:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding the shop ad.",
      error: error.message || "Internal server error",
    });
  }
};

// getall ....................

export const getAllHomeAds = async (req, res) => {
  try {
    const homeAd = await Home.find();

    if (!homeAd) {
      return res.status(404).json({
        success: false,
        message: "home Ads not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "homeAds details fetched successfully",
      homeAd,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllFlatAds = async (req, res) => {
  try {
    // Fetch the agent details by ID
    const flatAds = await Flat.find();

    if (!flatAds) {
      return res.status(404).json({
        success: false,
        message: "Flat Ads not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "LandAds fetched successfully",
      flatAds,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllLandAds = async (req, res) => {
  try {
    // // Validate if the agentId is provided
    // if (!id) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Agent ID is required",
    //   });
    // }

    // Fetch the agent details by ID
    const homeAd = await Land.find();
    // .populate("connections", "name email phoneNumber")
    // .populate("clients", "name email phoneNumber")
    // .populate("documents")
    // .select("-password");

    // If agent not found, return a 404 error
    if (!homeAd) {
      return res.status(404).json({
        success: false,
        message: "land Ads not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "landAds details fetched successfully",
      homeAd,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllShopAds = async (req, res) => {
  try {
    // // Validate if the agentId is provided
    // if (!id) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Agent ID is required",
    //   });
    // }

    // Fetch the agent details by ID
    const homeAd = await Shop.find();
    // .populate("connections", "name email phoneNumber")
    // .populate("clients", "name email phoneNumber")
    // .populate("documents")
    // .select("-password");

    // If agent not found, return a 404 error
    if (!homeAd) {
      return res.status(404).json({
        success: false,
        message: "shop Ads not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "ShopAds details fetched successfully",
      homeAd,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// delete Ads ....................

export const deleteHomeAd = async (req, res) => {
  const { id } = req.agent;
  const { homeAdId } = req.params;

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    // Fetch the agent details by ID
    const homeAd = await Home.findByIdAndDelete(homeAdId);

    if (homeAd) {
      await Agent.findByIdAndUpdate(id, { $pull: { myHomeAds: homeAdId } });
    }

    // If agent not found, return a 404 error
    if (!homeAd) {
      return res.status(404).json({
        success: false,
        message: "home Ads not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "homeAds deleted successfully",
      data: homeAdId,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteFlatAd = async (req, res) => {
  const { id } = req.agent;
  const { flatAdId } = req.params;

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }
    console.log(flatAdId);
    const flatAd = await Flat.findByIdAndDelete(flatAdId);

    if (flatAd) {
      await Agent.findByIdAndUpdate(id, { $pull: { myFlatAds: flatAdId } });
    }

    // If agent not found, return a 404 error
    if (!flatAd) {
      return res.status(404).json({
        success: false,
        message: "flat Ad not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "flatAd deleted successfully",
      data: flatAdId,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteLandAd = async (req, res) => {
  const { id } = req.agent;
  const { landAdId } = req.params;

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    const landAd = await Land.findByIdAndDelete(landAdId);

    if (landAd) {
      await Agent.findByIdAndUpdate(id, { $pull: { myLandAds: landAdId } });
    }

    // If agent not found, return a 404 error
    if (!landAd) {
      return res.status(404).json({
        success: false,
        message: "land Ad not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "landAds deleted successfully",
      data: landAdId,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteShopAd = async (req, res) => {
  const { id } = req.agent;
  const { shopAdId } = req.params;

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    // Fetch the agent details by ID
    const shopAd = await Shop.findByIdAndDelete(shopAdId);
    if (shopAd) {
      await Agent.findByIdAndUpdate(id, { $pull: { myShopAds: shopAdId } });
    }
    // If agent not found, return a 404 error
    if (!shopAd) {
      return res.status(404).json({
        success: false,
        message: "shop Ad not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "shopAd deleted successfully",
      data: shopAdId,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// update home adds ...flatPropertySchema...

const OpHomePropertySchema = z.object({
  agentId: z.string().nonempty("Agent ID is required"), // Assuming
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  pincode: z.number().optional(),
  location: z.string().nonempty(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  area: z.number().min(0, "Area must be a positive number").optional(),
  bedrooms: z.number().min(0, "Bedrooms must be a positive number").optional(),
  bathrooms: z
    .number()
    .min(0, "Bathrooms must be a positive number")
    .optional(),
  parking: z.boolean().default(false).optional(),
  garden: z.boolean().default(false).optional(),
  amenities: z.array(z.string()).default([]).optional(),
  nearby: z.array(z.string()).default([]).optional(),
});

export const editHomeAd = async (req, res) => {
  const { id } = req.agent;
  const { homeAdId } = req.params;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    pincode,
    location,
    price,
    area,
    bedrooms,
    bathrooms,
    parking,
    garden,
    amenities,
    nearby,
  } = req.body;

  // console.log("this is req.cody",req.body)

  const parsed = OpHomePropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    bedrooms: parseIfNumber(bedrooms),
    bathrooms: parseIfNumber(bathrooms),
    parking: parseIfBoolean(parking),
    garden: parseIfBoolean(garden),
    amenities,
    nearby,
  });

  const files = req.files;

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    const uploadResults = [];
    console.log(files);

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "raw",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    console.log(uploadResults);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const updatedData = { ...parsed.data, images: uploadResults };

    // console.log("parsed success");

    const updateHomeAd = await Home.findByIdAndUpdate(
      homeAdId,
      {
        $set: updatedData,
      },
      { new: true, runValidators: true }
    );

    // console.log(homeAd)

    if (updateHomeAd) {
      return res.status(201).json({
        success: true,
        message: "Agent homesAd update successfully",
        updateHomeAd,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const OpFlatPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  location: z.string().min(1, "Location is required").optional(),
  pincode: z.number().optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  area: z.number().positive("Area must be a positive number").optional(),
  bedrooms: z
    .number()
    .positive("Bedrooms must be a positive number")
    .optional(),
  bathrooms: z
    .number()
    .positive("Bathrooms must be a positive number")
    .optional(),
  floor: z.number().optional().optional(),
  totalFloors: z.number().optional(),
  furnished: z.enum(["unfurnished", "furnished", "semifurnished"]).optional(),
  amenities: z.array(z.string()).optional().default([]),
  age: z.number().positive("Age must be a positive number").optional(),
  maintenance: z
    .number()
    .positive("Maintenance must be a positive number")
    .optional(),
  nearby: z.array(z.string()).optional().default([]),
  images: z.array(z.string().url("Invalid URL")).optional().default([]),
});

export const editFlatAd = async (req, res) => {
  const { id } = req.agent;
  const { homeAdId } = req.params;

  // console.log(id,homeAdId)

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    location,
    pincode,
    price,
    area,
    bedrooms,
    bathrooms,
    floor,
    totalFloors,
    furnished,
    amenities,
    age,
    maintenance,
    nearby,
  } = req.body;

  const parsed = OpFlatPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    bedrooms: parseIfNumber(bedrooms),
    bathrooms: parseIfNumber(bathrooms),
    floor: parseIfNumber(floor),
    totalFloors: parseIfNumber(totalFloors),
    furnished,
    amenities,
    age: parseIfNumber(age),
    maintenance: parseIfNumber(maintenance),
    nearby,
  });

  const files = req.files;

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    const uploadResults = [];
    // console.log(files);

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "raw",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    // console.log("parsed success");

    const updatedData = { ...parsed.data, images: uploadResults };

    console.log(updatedData);

    const flatAd = await Flat.findByIdAndUpdate(
      homeAdId,
      {
        $set: updatedData,
      },
      { new: true, runValidators: true }
    );

    // console.log(homeAd)

    if (flatAd) {
      return res.status(201).json({
        success: true,
        message: "Agent flatsAd update successfully",
        flatAd,
      });
    }
  } catch (error) {
    console.log(error.me);
  }
};

const OpLandPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required").optional(), // Non-empty string
  description: z.string().min(1, "Description is required").optional(), // Non-empty string
  location: z.string().min(1, "Location is required").optional(), // Non-empty string
  pincode: z.number().int("Pincode must be an integer").optional(), // Optional integer
  price: z.number().positive("Price must be a positive number").optional(), // Positive number
  area: z.number().positive("Area must be a positive number").optional(), // Positive number
  zoneType: z
    .string()
    .min(1, "Zone Type is required")
    .refine(
      (value) => ["Residential", "Commercial", "Agricultural"].includes(value),
      "Zone Type must be 'Residential', 'Commercial', or 'Agricultural'"
    )
    .optional(), // Restricted string values
  roadAccess: z.boolean().default(false).optional(), // Boolean with default `false`
  nearby: z.array(z.string()).optional().default([]), // Array of strings (default: empty array)
  images: z
    .array(z.string().url("Invalid URL for image"))
    .optional()
    .default([]), // Array of valid image URLs (default: empty array)
});

export const editLandAd = async (req, res) => {
  const { id } = req.agent;
  const { homeAdId } = req.params;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    pincode,
    location,
    price,
    area,
    zoneType,
    roadAccess,
    nearby,
  } = req.body;

  // console.log("this is req.cody",req.body)

  const parsed = OpLandPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    zoneType,
    roadAccess: parseIfBoolean(roadAccess),
    nearby,
  });

  const files = req.files;

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    const uploadResults = [];
    // console.log(files);

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "raw",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    // console.log(uploadResults);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    // console.log("parsed success");
    const updatedData = { ...parsed.data, images: uploadResults };

    console.log(updatedData);

    const landAd = await Land.findByIdAndUpdate(
      homeAdId,
      {
        $set: updatedData,
      },
      { new: true, runValidators: true }
    );

    // console.log(homeAd)

    if (landAd) {
      return res.status(201).json({
        success: true,
        message: "Agent landsAd update successfully",
        landAd,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const OpShopPropertySchema = z.object({
  agentId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"), // Validates a MongoDB ObjectId
  title: z.string().min(1, "Title is required").optional(), // Non-empty string
  description: z.string().min(1, "Description is required").optional(), // Non-empty string
  location: z.string().min(1, "Location is required").optional(), // Non-empty string
  pincode: z.number().int("Pincode must be an integer").optional(), // Optional integer
  price: z.number().positive("Price must be a positive number").optional(), // Positive number
  area: z.number().positive("Area must be a positive number").optional(), // Positive number
  floor: z
    .number()
    .int("Floor must be an integer")
    .positive("Floor must be a positive number")
    .optional(), // Required positive integer
  furnished: z.boolean().default(false).optional(), // Boolean with default `false`
  parking: z.boolean().default(false).optional(), // Boolean with default `false`
  nearby: z.array(z.string()).optional().default([]), // Array of strings (default: empty array)
  images: z
    .array(z.string().url("Invalid URL for image"))
    .optional()
    .default([]), // Array of valid image URLs (default: empty array)
});

export const editShopAd = async (req, res) => {
  const { id } = req.agent;
  const { homeAdId } = req.params;

  const parseIfNumber = (value) => {
    return isNaN(value) ? value : parseInt(value, 10);
  };

  const parseIfBoolean = (value) => {
    if (typeof value === "string") {
      return value.toLowerCase() === "true"; // Convert "true" to true and others to false
    }
    return Boolean(value); // Convert numbers (e.g., 1 or 0) to true/false
  };

  const {
    title,
    description,
    location,
    pincode,
    price,
    area,
    floor,
    furnished,
    parking,
    nearby,
  } = req.body;

  const parsed = OpShopPropertySchema.safeParse({
    agentId: id,
    title,
    description,
    pincode: parseIfNumber(pincode),
    location,
    price: parseIfNumber(price),
    area: parseIfNumber(area),
    floor: parseIfNumber(floor),
    furnished: parseIfBoolean(furnished),
    parking: parseIfBoolean(parking),
    nearby,
  });

  const files = req.files;

  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  try {
    const uploadResults = [];
    console.log(files);

    if (files) {
      for (const file of files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "agents",
            resource_type: "raw",
            transformation: cropParams,
          });

          uploadResults.push(result.secure_url);

          fs.unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file:", err);
            }
          });
        } catch (error) {
          console.error("Error uploading file to Cloudinary:", error);
        }
      }
    }

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }
    // console.log("parsed success");
    const updatedData = { ...parsed.data, images: uploadResults };

    const shopAd = await Shop.findByIdAndUpdate(
      homeAdId,
      {
        $set: updatedData,
      },
      { new: true, runValidators: true }
    );
    // console.log(homeAd)

    if (shopAd) {
      return res.status(201).json({
        success: true,
        message: "Agent shopsAd update successfully",
        shopAd,
      });
    }
  } catch (error) {
    console.log(error.me);
  }
};
