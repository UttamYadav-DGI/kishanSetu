import { Buyer } from "../Models/Buyer.model.js";
import { User } from "../Models/User.model.js";
import { Crop } from "../Models/Crop.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";

/**
 * ✅ Create/Update Buyer Profile
 * Only Role === "buyer" can access
 */
const setBuyerProfile = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (user.Role !== "buyer") {
    throw new ApiError(403, "Only buyer can create buyer profile");
  }

  const { Address } = req.body;

  if (!Address || Address.trim().length < 3) {
    throw new ApiError(400, "Address is required (min 3 characters)");
  }

  const buyerProfile = await Buyer.findOneAndUpdate(
    { userId },
    {
      $set: {
        Address: Address.trim()
      },
      $setOnInsert: {
        userId
      }
    },
    { new: true, upsert: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, buyerProfile, "Buyer profile saved successfully"));
});

/**
 * ✅ Get Buyer Profile
 */
const getBuyerProfile = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const buyerProfile = await Buyer.findOne({ userId }).populate(
    "userId",
    "Name EmailId PhoneNo Role Avatar"
  );

  if (!buyerProfile) {
    throw new ApiError(404, "Buyer profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, buyerProfile, "Buyer profile fetched successfully"));
});

/**
 * ✅ Buyer Dashboard
 * Shows buyer info + some marketplace stats
 */
const getBuyerDashboard = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const user = await User.findById(userId).select("Name Role Avatar");

  if (!user || user.Role !== "buyer") {
    throw new ApiError(403, "Buyer access only");
  }

  const buyerProfile = await Buyer.findOne({ userId });

  // Marketplace Stats
  const totalAvailableCrops = await Crop.countDocuments({ status: "available" });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
        buyerProfile,
        totalAvailableCrops
      },
      "Buyer dashboard fetched successfully"
    )
  );
});

/**
 * ✅ Marketplace: Get All Available Crops
 * Buyer can filter/search
 *
 * Example:
 * /api/v1/buyers/marketplace?search=wheat&location=up&minPrice=10&maxPrice=100
 */
const getMarketplaceCrops = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) throw new ApiError(401, "Unauthorized access");

  const user = await User.findById(userId).select("Role");
  if (!user || user.Role !== "buyer") {
    throw new ApiError(403, "Buyer access only");
  }

  const { search, location, minPrice, maxPrice } = req.query;

  const query = { status: "available" };

  if (search) {
    query.cropName = { $regex: search.trim(), $options: "i" };
  }

  if (location) {
    query.location = { $regex: location.trim(), $options: "i" };
  }

  if (minPrice || maxPrice) {
    query.pricePerKg = {};
    if (minPrice) query.pricePerKg.$gte = Number(minPrice);
    if (maxPrice) query.pricePerKg.$lte = Number(maxPrice);
  }

  const crops = await Crop.find(query)
    .populate("farmerId", "Name PhoneNo EmailId Address") // ✅ added populate
    .sort({ createdAt: -1 })
    .limit(30);

  return res
    .status(200)
    .json(new ApiResponse(200, crops, "Marketplace crops fetched successfully"));
});


/**
 * ✅ Marketplace: Get Single Crop Details
 */
const getCropDetailsForBuyer = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "Crop id is required");

  const crop = await Crop.findById(id).populate(
    "farmerId",
    "Name PhoneNo EmailId Address"
  );

  if (!crop) throw new ApiError(404, "Crop not found");

  return res
    .status(200)
    .json(new ApiResponse(200, crop, "Crop details fetched successfully"));
});


export {
  setBuyerProfile,
  getBuyerProfile,
  getBuyerDashboard,
  getMarketplaceCrops,
  getCropDetailsForBuyer
};
