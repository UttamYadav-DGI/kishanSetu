import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },

    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      required: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },

    quantityKg: { type: Number, required: true },
    pricePerKg: { type: Number, required: true },
    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID"],
      default: "PENDING",
    },

    deliveryAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
