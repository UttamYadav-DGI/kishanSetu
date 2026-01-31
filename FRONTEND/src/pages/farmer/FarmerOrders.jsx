import React, { useEffect, useState } from "react";
import api from "../../Services/Api";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/v1/orders/farmer", {
        withCredentials: true,
      });
      setOrders(res.data.data);
    } catch (err) {
      alert("Failed to fetch farmer orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(
        `/api/v1/orders/${id}/status`,
        { status },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Orders Received 📦</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white shadow rounded-xl p-4">
              <h2 className="font-bold capitalize">{o.cropId?.cropName}</h2>

              <p className="text-sm text-gray-600">
                Buyer: {o.buyerId?.Name}
              </p>
              <p className="text-sm">Qty: {o.quantityKg} kg</p>
              <p className="text-sm font-semibold">Total: ₹{o.totalPrice}</p>

              <p className="text-sm mt-2">
                Delivery: {o.deliveryAddress}
              </p>

              <p className="mt-2 font-semibold">
                Status:{" "}
                <span className="text-blue-600">{o.status}</span>
              </p>

              {/* ✅ Buttons for Farmer */}
              {o.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => updateStatus(o._id, "confirmed")}
                    className="w-1/2 bg-green-600 text-white py-2 rounded-lg"
                  >
                    Accept ✅
                  </button>

                  <button
                    onClick={() => updateStatus(o._id, "rejected")}
                    className="w-1/2 bg-red-600 text-white py-2 rounded-lg"
                  >
                    Reject ❌
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
