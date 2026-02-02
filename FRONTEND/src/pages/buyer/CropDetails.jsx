import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCropDetailsForBuyer } from "../../Services/buyerApi.js";
import { useNavigate } from "react-router-dom";
import  PlaceOrder  from "../buyer/PlaceOrder.jsx"


const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);

  // ✅ Order Form
  const [qty, setQty] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    try {
      const res = await getCropDetailsForBuyer(id);
      setCrop(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load crop");
    }
  };

  // ✅ Pay Now Function ✅ ADD HERE
const handlePayNow = async () => {
  try {
    if (!qty || qty <= 0) return alert("Quantity must be greater than 0");
    if (!deliveryAddress.trim()) return alert("Delivery address is required");
    if (!crop?._id) return alert("Crop not loaded yet");

    if (!window.Razorpay) {
      return alert("Razorpay SDK not loaded. Add script in index.html");
    }

    // ✅ 1) Place order in DB
    const orderRes =  PlaceOrder({
      cropId: crop._id,
      quantityKg: qty,
      deliveryAddress,
    });

    const dbOrder = orderRes.data.data;

    // ✅ 2) Create Razorpay order
    const payRes = await api.post(
      "/api/v1/payments/create-order",
      { orderId: dbOrder._id },
      { withCredentials: true }
    );

    const { razorpayOrderId, amount, currency } = payRes.data.data;

    console.log("razorpayOrderId:", razorpayOrderId);
    console.log("amount:", amount);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: "KishanSetu",
      description: "Crop Purchase Payment",
      order_id: razorpayOrderId,

      handler: async function (response) {
        console.log("✅ Payment success response:", response);

        await api.post(
          "/api/v1/payments/verify",
          {
            orderId: dbOrder._id,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          },
          { withCredentials: true }
        );

        alert("✅ Payment Successful!");
        navigate("/buyers/orders");
      },

      theme: { color: "#16a34a" },
    };

    const rzp = new window.Razorpay(options);

    // ✅ capture failure reason
    rzp.on("payment.failed", function (response) {
      console.log("❌ Payment failed full:", response.error);
      alert(response.error.description || "Payment failed");
    });

    rzp.open();
  } catch (err) {
    console.log("❌ ERROR:", err);
    alert(err.response?.data?.message || err.message || "Payment failed");
  }
};


  if (!crop) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold capitalize">{crop.cropName}</h1>

        <p className="text-gray-600 mt-2">📍 {crop.location}</p>
        <p className="font-semibold mt-2">₹{crop.pricePerKg}/kg</p>
        <p className="text-sm mt-2">Available: {crop.quantity} kg</p>
        <p className="text-sm mt-2">Status: {crop.status}</p>

        {/* ✅ Order Form */}
        <div className="mt-6 space-y-3">
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            min={1}
            max={crop.quantity}
            className="w-full border rounded-lg p-2"
            placeholder="Enter quantity in KG"
          />

          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full border rounded-lg p-2"
            rows={3}
            placeholder="Enter delivery address..."
          />
        </div>

        {/* ✅ Pay Now */}
        <button
          onClick={handlePayNow}
          className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Pay Now ✅
        </button>
      </div>
    </div>
  );
};

export default CropDetails;
