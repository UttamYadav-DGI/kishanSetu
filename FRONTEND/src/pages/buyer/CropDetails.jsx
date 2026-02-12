import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { 
  MapPin, 
  Package, 
  IndianRupee, 
  Truck, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2 
} from "lucide-react";

import api from "../../Services/Api";
import { getCropDetailsForBuyer, placeOrder } from "../../Services/buyerApi.js";

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [qty, setQty] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Derived state for total price
  const pricePerKg = crop?.pricePerKg || 0;
  const totalAmount = Number(qty) * pricePerKg;

  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    setLoading(true);
    try {
      const res = await getCropDetailsForBuyer(id);
      setCrop(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load crop details");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };
  console.log("crops deatils",crop)
  const handlePayNow = async () => {
    // Validation
    if (!qty || Number(qty) <= 0) return toast.error("Please enter a valid quantity");
    if (Number(qty) > crop.quantity) return toast.error(`Only ${crop.quantity}kg available`);
    if (!deliveryAddress.trim()) return toast.error("Delivery address is required");
    if (!crop?._id) return toast.error("Crop data missing");

    if (!window.Razorpay) {
      return toast.error("Payment system not loaded. Check internet connection.");
    }

    setProcessing(true);

    try {
      // 1) Place order in DB
      const orderRes = await placeOrder({
        cropId: crop._id,
        quantityKg: Number(qty),
        deliveryAddress,
      });

      const dbOrder = orderRes.data.data;

      // 2) Create Razorpay order
      const payRes = await api.post(
        "/api/v1/payments/create-order",
        { orderId: dbOrder._id },
        { withCredentials: true }
      );

      const { razorpayOrderId, amount, currency } = payRes.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "KishanSetu",
        description: `Payment for ${crop.cropName}`,
        order_id: razorpayOrderId,
        prefill: {
          // You can prefill user data here if available in context
          // name: user.name,
          // email: user.email 
        },
        handler: async function (response) {
          try {
            // 3) Verify payment
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

            toast.success("Payment Successful! Order Placed.");
            navigate("/buyers/orders");
          } catch (err) {
            toast.error("Payment verification failed. Contact support.");
          }
        },
        theme: { color: "#16a34a" },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            toast("Payment cancelled");
          }
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        toast.error(response.error.description || "Payment failed");
        setProcessing(false);
      });

      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong processing your order.");
      setProcessing(false);
    }
  };

  // --- Loading Skeleton ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-start pt-20">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
          <div className="h-96 bg-gray-200 rounded-2xl"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!crop) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-green-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Product Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Image & Header Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              {/* Fallback image if crop doesn't have one */}
              <div className="h-64 sm:h-80 w-full bg-green-100 flex items-center justify-center text-green-800">
                  {crop.image ? (
                     <img src={crop.image} alt={crop.cropName} className="w-full h-full object-cover" />
                  ) : (
                     <div className="flex flex-col items-center">
                       <Package size={64} className="opacity-50" />
                       <span className="mt-2 font-medium">No Image Available</span>
                     </div>
                  )}
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">{crop.cropName}</h1>
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      {crop.location}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    crop.quantity > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {crop.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
                    <p className="text-lg font-bold text-gray-900">₹{crop.pricePerKg}<span className="text-sm font-normal text-gray-500">/kg</span></p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Available</p>
                    <p className="text-lg font-bold text-gray-900">{crop.quantity} <span className="text-sm font-normal text-gray-500">kg</span></p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Quality</p>
                    <p className="text-lg font-bold text-gray-900">A Grade</p> {/* Placeholder or fetch from DB */}
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Seller</p>
                    <p className="text-lg font-bold text-gray-900 truncate">{crop.sellerName || "Farmer"}</p>
                  </div>
                </div>

                <div className="mt-6 text-gray-600 leading-relaxed">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p>{crop.description || "Fresh produce directly from the farm. High quality and organically grown."}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Form / Checkout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Place Order</h2>

              <div className="space-y-4">
                {/* Quantity Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (kg)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      min="1"
                      max={crop.quantity}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="0"
                    />
                    <Package className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">Max available: {crop.quantity} kg</p>
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <div className="relative">
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                      rows={3}
                      placeholder="Street, City, Pincode..."
                    />
                    <MapPin className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Price ({qty || 0} kg x ₹{pricePerKg})</span>
                  <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handlePayNow}
                disabled={processing || crop.quantity === 0}
                className={`mt-6 w-full py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center transition-all transform hover:-translate-y-1 ${
                  processing || crop.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white hover:shadow-green-200"
                }`}
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  <>
                    Secure Checkout
                    <ShieldCheck className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center text-xs text-gray-400">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Payments secured by Razorpay
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CropDetails;