import React, { useEffect, useState } from "react";
import api from "../../Services/Api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/v1/orders/buyer", {
        withCredentials: true,
      });
      setOrders(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Status Badge
  const getStatusBadge = (status) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "confirmed") return "bg-green-100 text-green-700";
    if (status === "delivered") return "bg-blue-100 text-blue-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  // ✅ Payment Badge
  const getPaymentBadge = (paymentStatus) => {
    if (paymentStatus === "paid") return "bg-green-100 text-green-700";
    if (paymentStatus === "failed") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700"; // unpaid
  };

  // ✅ Download Invoice (Print)
  const handleDownloadInvoice = (order) => {
    const farmer = order.farmerId || {};
    const crop = order.cropId || {};

    const invoiceHTML = `
      <html>
      <head>
        <title>Invoice - ${order._id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #16a34a; }
          .box { border: 1px solid #ddd; padding: 16px; border-radius: 10px; margin-top: 15px; }
          .row { display: flex; justify-content: space-between; margin: 8px 0; }
          .label { font-weight: bold; }
          .small { color: #555; font-size: 14px; }
        </style>
      </head>
      <body>
        <h1>KishanSetu Invoice 🧾</h1>
        <p class="small">Order ID: ${order._id}</p>

        <div class="box">
          <h2>Crop Details</h2>
          <div class="row"><span class="label">Crop:</span> <span>${crop.cropName || "-"}</span></div>
          <div class="row"><span class="label">Location:</span> <span>${crop.location || "-"}</span></div>
          <div class="row"><span class="label">Price/Kg:</span> <span>₹${order.pricePerKg}</span></div>
          <div class="row"><span class="label">Quantity:</span> <span>${order.quantityKg} kg</span></div>
          <div class="row"><span class="label">Total:</span> <span>₹${order.totalPrice}</span></div>
        </div>

        <div class="box">
          <h2>Farmer Details</h2>
          <div class="row"><span class="label">Name:</span> <span>${farmer.Name || "-"}</span></div>
          <div class="row"><span class="label">Phone:</span> <span>${farmer.PhoneNo || "-"}</span></div>
          <div class="row"><span class="label">Email:</span> <span>${farmer.EmailId || "-"}</span></div>
        </div>

        <div class="box">
          <h2>Delivery</h2>
          <div class="row"><span class="label">Address:</span> <span>${order.deliveryAddress || "-"}</span></div>
          <div class="row"><span class="label">Order Status:</span> <span>${order.status}</span></div>
          <div class="row"><span class="label">Payment:</span> <span>${order.paymentStatus || "unpaid"}</span></div>
        </div>

        <p class="small" style="margin-top:20px;">Thank you for using KishanSetu 🌾</p>
      </body>
      </html>
    `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(invoiceHTML);
    newWindow.document.close();
    newWindow.print(); // ✅ user can "Save as PDF"
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">My Orders 🧾</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white shadow rounded-xl p-5">
              <h2 className="font-bold text-lg capitalize">
                {o.cropId?.cropName || "Crop"}
              </h2>

              {/* ✅ Farmer Info */}
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Farmer:</span>{" "}
                  {o.farmerId?.Name || "-"}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {o.farmerId?.PhoneNo || "-"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {o.farmerId?.EmailId || "-"}
                </p>
              </div>

              <div className="mt-3 text-sm">
                <p>Qty: {o.quantityKg} kg</p>
                <p>Total: ₹{o.totalPrice}</p>
              </div>

              {/* ✅ Status + Payment */}
              <div className="mt-4 flex gap-2 flex-wrap">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                    o.status
                  )}`}
                >
                  {o.status?.toUpperCase()}
                </span>

                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getPaymentBadge(
                    o.paymentStatus
                  )}`}
                >
                  {(o.paymentStatus || "unpaid").toUpperCase()}
                </span>
              </div>

              {/* ✅ Invoice Button */}
              <button
                onClick={() => handleDownloadInvoice(o)}
                className="mt-4 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
              >
                Download Invoice 📄
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
