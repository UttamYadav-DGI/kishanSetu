import React, { useEffect, useState } from "react";
import BuyerHeader from "../../component/buyer/BuyerHeader";
import BuyerStats from "../../component/buyer/BuyerStats";
import { getBuyerDashboard } from "../../Services/buyerApi.js";
import { useNavigate } from "react-router-dom";

const BuyerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getBuyerDashboard();
      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!dashboard) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <BuyerHeader name={dashboard.user?.Name || "Buyer"} />

      <BuyerStats totalAvailableCrops={dashboard.totalAvailableCrops} />

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate("/buyers/marketplace")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Browse Marketplace
        </button>

        <button
          onClick={() => navigate("/buyers/profile")}
          className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default BuyerDashboard;
