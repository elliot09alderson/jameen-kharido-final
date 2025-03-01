import { Admin } from "../models/admin.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Document } from "../models/document.js";
import { Agent } from "../models/agent.js";
import { Home } from "../models/homeAd.js";
import { Land } from "../models/landAd.js";
import { Shop } from "../models/shopAd.js";
import { Flat } from "../models/flatAd.js";

const adminSchema = z.object({
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

const optionalAdminSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email format" }).optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .optional(),
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

export async function createAdmin(req, res) {
  const { email, password, name, phoneNumber } = req.body;
  const parsed = adminSchema.safeParse({
    name,
    email,
    password,
    phoneNumber,
  });

  const file = req.file;
  const cropParams = {
    gravity: "auto",
    width: 300,
    height: 300,
    crop: "crop",
  };

  const isPresent = await Admin.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (isPresent) {
    return res
      .status(409)
      .json({ message: "Email or phone number already exists" });
  }

  try {
    let result = "";
    if (file) {
      result = await cloudinary.uploader.upload(file?.path, {
        folder: "agents",
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
        error: parsed.error.errors.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const encryptedPass = await bcrypt.hash(parsed.data.password, 10);
    parsed.data.password = encryptedPass;

    const admin = await Admin.create({
      ...parsed.data,
      avatar: result?.url || "",
    }).select("-password");

    if (admin) {
      return res.status(201).json({
        success: true,
        message: "admin registered successfully",
        admin,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getAdminDeails(req, res) {
  const { id } = req.admin;

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "admin ID is required",
      });
    }

    // Fetch the agent details by ID
    const admin = await Admin.findById(id);

    // If agent not found, return a 404 error
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "Admin details fetched successfully",
      data: admin,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function deleteAdmin(req, res) {
  const { id } = req.admin;
  console.log(id);

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    // Fetch the agent details by ID
    const admin = await Admin.findByIdAndDelete(id);

    // If agent not found, return a 404 error
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      data: admin,
      message: "Admin delete successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function editAdminDetails(req, res) {
  try {
    const { email, password, contactNumber } = req.body;

    // Handle the optional image file
    let image = req.file
      ? {
        mimetype: req.file.mimetype,
        size: req.file.size,
        filepath: req.file.path, // Assuming you're using a library like `multer`
      }
      : undefined;

    // Parse and validate the input data using optionalCustomerSchema
    const parsed = optionalAdminSchema.safeParse({
      name,
      email,
      password,
      address,
      phoneNumber,
      image: image ? { mimetype: image.mimetype, size: image.size } : undefined,
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

    // Process the image if provided
    let avatar = undefined;
    if (image) {
      const cropParams = {
        width: 300,
        height: 300,
        crop: "crop",
        gravity: "auto",
      };

      const result = await cloudinary.uploader.upload(image.filepath, {
        folder: "profile",
        transformation: cropParams,
      });

      avatar = result?.url;
    }

    // Update the customer data
    const updatedData = {
      ...parsed.data,
      avatar: avatar || undefined, // Only add avatar if a new image was uploaded
    };

    // Remove undefined fields to ensure only provided fields are updated
    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedAdmin = await Admin.findOneAndUpdate(
      { email }, // Find customer by email
      { $set: updatedData }, // Update only provided fields
      { new: true, runValidators: true } // Return the updated document and validate updates
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Admin data updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getAllAgents(req, res) {
  const { id } = req.admin;

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Amin ID is required",
      });
    }

    // Fetch the agent details by ID
    const agent = await Agent.find();

    // If agent not found, return a 404 error
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "agent not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "agent details fetched successfully",
      data: agent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getAgent(req, res) {
  const { id } = req.admin;
  const agentId = req.params.id;
  console.log(agentId);
  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }
    if (!agentId) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    // Fetch the agent details by ID
    const agent = await Agent.findById(agentId)
      .populate("connections", "name email phoneNumber")
      .populate("clients", "name email phoneNumber")
      .populate("documents")
      .select("-password");

    // If agent not found, return a 404 error
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "Agent details fetched successfully",
      data: agent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getAdDetails(req, res) {
  const { id } = req.params;
  // console.log(id);

  const { type } = req.query;

  if (!id || !type) {
    return res
      .status(400)
      .json({ error: "Missing Id or type in query parameters" });
  }

  console.log(id, type);

  // Map the type to the corresponding model
  const models = {
    Home: Home,
    Land: Land,
    Shop: Shop,
    Flat: Flat,
  };

  const Model = models[type];
  // console.log(Model);

  if (!Model) {
    return res.status(400).json({ error: "Invalid type provided" });
  }
  // console.log(id);
  try {
    const adDetail = await Model.findById(id);

    if (!adDetail) {
      return res.status(404).json({ error: "Ad not found" });
    }
    console.log(adDetail);
    res.json({ success: true, data: adDetail });
  } catch (error) {
    console.error("Error fetching ad detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteAgentAd(req, res) {
  const { id } = req.params;

  const { type } = req.query;

  // console.log(type)

  if (!id || !type) {
    return res
      .status(400)
      .json({ error: "Missing id or type in query parameters" });
  }

  // Map the type to the corresponding model

  // Map the type to the corresponding model
  const models = {
    Home: Home,
    Land: Land,
    Shop: Shop,
    Flat: Flat,
  };

  const Model = models[type];

  if (!Model) {
    return res.status(400).json({ error: "Invalid type provided" });
  }

  try {
    const adDetail = await Model.findByIdAndDelete(id);

    if (!adDetail) {
      return res.status(404).json({ error: "Ad not found" });
    }

    res.json({ success: true, message: "Agent Ad Delete successfully" });
  } catch (error) {
    console.error("Error fetching ad detail:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllBlockedAgents(req, res) {
  const { id } = req.admin;

  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Amin ID is required",
      });
    }

    // Fetch the agent details by ID
    const agent = await Agent.find({ isAccountDisabled: true });

    // If agent not found, return a 404 error
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "agent not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "agent details fetched successfully",
      data: agent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
export async function BlockedAgents(req, res) {
  const { id } = req.admin;
  const { AgentId } = req.params;
  console.log(AgentId)


  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Amin ID is required",
      });
    }


    if (!AgentId) {
      return res.status(400).json({
        success: false,
        message: "Agent ID is required",
      });
    }

    // Fetch the agent details by ID
    const agent = await Agent.findByIdAndUpdate(
      AgentId,
      { $set: { isAccountDisabled: true } },
      { new: true } // Returns the updated document
    );

    if (agent) {
      await Admin.findByIdAndUpdate(
        id, // Replace with the actual admin ID
        { $push: { blockedAgents: AgentId } },
        { new: true } // Returns the updated document
      );
    }





    // If agent not found, return a 404 error
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "agent not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "agent details fetched successfully",
      data: agent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getVerifiedAgents(req, res) {
  const { id } = req.admin;


  try {
    // Validate if the agentId is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Amin ID is required",
      });
    }

    // Fetch the agent details by ID
    const agent = await Agent.find({ isVerified: true });

    // If agent not found, return a 404 error
    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "agent not found",
      });
    }

    // Return the agent details
    return res.status(200).json({
      success: true,
      message: "agent details fetched successfully",
      agent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export async function getRequestedAds(req, res) {
  try {
    // Define the models
    const models = {
      Home: Home,
      Land: Land,
      Shop: Shop,
      Flat: Flat,
    };

    // Fetch ads from each model where isApproved is false
    const unapprovedAds = await Promise.all(
      Object.values(models).map((Model) => Model.find({ isApproved: false }))
    );

    // Flatten the array of results (if multiple models have data)
    const allUnapprovedAds = unapprovedAds.flat();

    if (allUnapprovedAds.length === 0) {
      return res.status(404).json({ error: "No unapproved ads found" });
    }

    res.status(200).json({
      success: true,
      message: "Unapproved ads fetched successfully",
      data: allUnapprovedAds,
    });
  } catch (error) {
    console.error("Error fetching unapproved ads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
