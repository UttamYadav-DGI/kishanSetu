import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Order } from "../Models/Order.model.js";
import { Crop } from "../Models/Crop.model.js";
import { User } from "../Models/User.model.js";

// ✅ Place Order (already done)
const placeOrder = AsyncHandler(async (req, res) => {
  const buyerId = req.user?._id;

  const { cropId, quantityKg, deliveryAddress } = req.body;

  if (!cropId || !quantityKg || !deliveryAddress) {
    throw new ApiError(400, "All fields are required");
  }

  const buyer = await User.findById(buyerId).select("Role");
  if (!buyer || buyer.Role !== "buyer") {
    throw new ApiError(403, "Buyer access only");
  }

  const crop = await Crop.findById(cropId);
  if (!crop) throw new ApiError(404, "Crop not found");

  if (crop.status !== "available") {
    throw new ApiError(400, "Crop is not available");
  }

  if (Number(quantityKg) > crop.quantity) {
    throw new ApiError(400, `Only ${crop.quantity} kg available`);
  }

  const totalPrice = Number(quantityKg) * crop.pricePerKg;

  const order = await Order.create({
    buyerId,
    farmerId: crop.farmerId,
    cropId,
    quantityKg,
    pricePerKg: crop.pricePerKg,
    totalPrice,
    deliveryAddress,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully ✅"));
});

// ✅ Buyer: My Orders
const getMyOrdersBuyer = AsyncHandler(async (req, res) => {
  const buyerId = req.user?._id;

  const user = await User.findById(buyerId).select("Role");
  if (!user || user.Role !== "buyer") {
    throw new ApiError(403, "Buyer access only");
  }

  const orders = await Order.find({ buyerId })
    .populate("cropId", "cropName pricePerKg location status")
    .populate("farmerId", "Name PhoneNo EmailId")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Buyer orders fetched ✅"));
});

// ✅ Farmer: Orders on my crops
const getMyOrdersFarmer = AsyncHandler(async (req, res) => {
  const farmerId = req.user?._id;

  const user = await User.findById(farmerId).select("Role");
  if (!user || user.Role !== "farmer") {
    throw new ApiError(403, "Farmer access only");
  }

  const orders = await Order.find({ farmerId })
    .populate("cropId", "cropName pricePerKg location status")
    .populate("buyerId", "Name PhoneNo EmailId Address")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "Farmer orders fetched ✅"));
});

// ✅ Farmer: Accept/Reject Order
const updateOrderStatus = AsyncHandler(async (req, res) => {
  const farmerId = req.user?._id;
  const { id } = req.params; // orderId
  const { status } = req.body;

  const user = await User.findById(farmerId).select("Role");
  if (!user || user.Role !== "farmer") {
    throw new ApiError(403, "Farmer access only");
  }

  if (!["confirmed", "rejected", "delivered"].includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }

  const order = await Order.findOne({ _id: id, farmerId });
  if (!order) throw new ApiError(404, "Order not found");

  // ✅ Only pending order can be accepted/rejected
  if (order.status !== "pending" && status !== "delivered") {
    throw new ApiError(400, `Order already ${order.status}`);
  }

  order.status = status;
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated ✅"));
});

export {
  placeOrder,
  getMyOrdersBuyer,
  getMyOrdersFarmer,
  updateOrderStatus,
};
