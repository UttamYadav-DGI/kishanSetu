import React, { useEffect, useState } from "react";
import { api } from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/orders/my-orders");
    setOrders(res.data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Orders 📦</h1>

      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded-xl bg-white">
            <p className="font-semibold">{order.crop?.name}</p>
            <p>Qty: {order.quantityKg} Kg</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
