import React, { useEffect, useState } from "react";
import api from "../../Services/Api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/v1/orders/buyer", {
        withCredentials: true,
      });
      setOrders(res.data.data);
    } catch (err) {
      alert("Failed to fetch orders");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">My Orders 🧾</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white shadow rounded-xl p-4">
              <h2 className="font-bold capitalize">{o.cropId?.cropName}</h2>
              <p className="text-sm text-gray-600">
                Farmer: {o.farmerId?.Name}
              </p>
              <p className="text-sm">Qty: {o.quantityKg} kg</p>
              <p className="text-sm">Total: ₹{o.totalPrice}</p>

              <p
                className={`mt-2 font-semibold ${
                  o.status === "pending"
                    ? "text-yellow-600"
                    : o.status === "confirmed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Status: {o.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
