import React, { useEffect, useState } from "react";
import api from "../../Services/Api";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/v1/orders/farmer", {
        withCredentials: true,
      });
      setOrders(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch farmer orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(
        `/api/v1/orders/${orderId}/status`,
        { status },
        { withCredentials: true }
      );

      alert(`✅ Order ${status}`);
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders Received 📦</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white shadow rounded-xl p-5">
              <h2 className="font-bold text-lg capitalize">
                {o.cropId?.cropName}
              </h2>

              <p className="text-sm text-gray-600 mt-1">
                Buyer: <span className="font-medium">{o.buyerId?.Name}</span>
              </p>

              <p className="text-sm">Qty: {o.quantityKg} kg</p>
              <p className="text-sm font-semibold text-green-700">
                Total: ₹{o.totalPrice}
              </p>

              <p className="text-sm mt-2 text-gray-700">
                Delivery Address: {o.deliveryAddress}
              </p>

              <p className="mt-3 font-semibold">
                Status:{" "}
                <span
                  className={`${
                    o.status === "pending"
                      ? "text-yellow-600"
                      : o.status === "confirmed"
                      ? "text-green-600"
                      : o.status === "rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {o.status}
                </span>
              </p>

              {/* ✅ Farmer Actions */}
              {o.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => updateStatus(o._id, "confirmed")}
                    className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Accept ✅
                  </button>

                  <button
                    onClick={() => updateStatus(o._id, "rejected")}
                    className="w-1/2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                  >
                    Reject ❌
                  </button>
                </div>
              )}

              {/* ✅ Mark delivered */}
              {o.status === "confirmed" && (
                <button
                  onClick={() => updateStatus(o._id, "delivered")}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Mark Delivered 📦
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerOrders;
