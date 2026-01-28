import { Crop } from "../Models/Crop.model.js";
import { Order } from "../Models/Order.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";

export const buyCrop = AsyncHandler(async (req, res) => {
  const buyerId = req.user._id;
  const { cropId, quantityKg, deliveryAddress } = req.body;

  if (!cropId || !quantityKg || !deliveryAddress) {
    throw new ApiError(400, "cropId, quantityKg and deliveryAddress are required");
  }

  const crop = await Crop.findById(cropId);
  if (!crop) throw new ApiError(404, "Crop not found");

  if (!crop.isActive) throw new ApiError(400, "Crop is not active");

  if (quantityKg <= 0) throw new ApiError(400, "Quantity must be greater than 0");

  if (crop.availableQtyKg < quantityKg) {
    throw new ApiError(400, "Not enough crop quantity available");
  }

  // ✅ Calculate total
  const totalAmount = quantityKg * crop.pricePerKg;

  // ✅ Create order (receipt base)
  const order = await Order.create({
    buyer: buyerId,
    crop: crop._id,
    farmer: crop.farmer,
    quantityKg,
    pricePerKg: crop.pricePerKg,
    totalAmount,
    deliveryAddress,
  });

  // ✅ Reduce crop stock
  crop.availableQtyKg -= quantityKg;

  // if crop finished
  if (crop.availableQtyKg === 0) {
    crop.isActive = false;
  }

  await crop.save();

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully ✅"));
});

export const getMyOrders = AsyncHandler(async (req, res) => {
  const buyerId = req.user._id;

  const orders = await Order.find({ buyer: buyerId })
    .sort({ createdAt: -1 })
    .populate("crop", "name pricePerKg location")
    .select("quantityKg totalAmount status paymentStatus createdAt");

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "My orders fetched successfully ✅"));
});
