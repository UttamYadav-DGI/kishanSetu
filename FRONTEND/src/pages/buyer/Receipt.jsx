import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export default function Receipt() {
  const { orderId } = useParams();
  const [receipt, setReceipt] = useState(null);

  const fetchReceipt = async () => {
    const res = await api.get(`/orders/receipt/${orderId}`);
    setReceipt(res.data.data);
  };

  useEffect(() => {
    fetchReceipt();
  }, []);

  if (!receipt) return <p className="p-5">Loading receipt...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Receipt ✅</h1>

      <div className="mt-4 border rounded-2xl p-4 bg-white">
        <p><b>Buyer:</b> {receipt.buyer?.Name}</p>
        <p><b>Crop:</b> {receipt.crop?.name}</p>
        <p><b>Quantity:</b> {receipt.quantityKg} Kg</p>
        <p><b>Price/Kg:</b> ₹{receipt.pricePerKg}</p>
        <p><b>Total:</b> ₹{receipt.totalAmount}</p>
        <p><b>Status:</b> {receipt.status}</p>
        <p><b>Delivery Address:</b> {receipt.deliveryAddress}</p>
      </div>
    </div>
  );
}
