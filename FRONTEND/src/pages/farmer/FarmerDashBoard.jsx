import React, { useEffect, useState } from "react";
import DashboardCard from "../../component/DashboardCard";
import CropCard from "../../component/CropCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../Services/Api";
const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Redirect if farmer profile not completed
  useEffect(() => {
    if (dashboard && !dashboard.farmerProfile) {
      navigate("/farmers/profile");
    }
  }, [dashboard, navigate]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get(
        "/api/v1/farmers/dashboard",
        { withCredentials: true }
      );
      setDashboard(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!dashboard) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const { user, crops, totalCrops, activeCrops } = dashboard;

  const filteredCrops =
    filter === "all"
      ? crops
      : crops.filter((crop) => crop.status === filter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* 🔝 Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg shadow mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {user.Name} 🌾
          </h1>
          <p className="text-sm text-gray-500">
            Farmer Dashboard
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <img
            src={user.Avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-12 h-12 rounded-full border"
          />
          <button
            onClick={() => navigate("/farmers/add-crop/:id")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Crop
          </button>
        </div>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Crops" value={totalCrops} />
        <DashboardCard title="Active Listings" value={activeCrops} />
        <DashboardCard
          title="Crops Sold"
          value={totalCrops - activeCrops}
        />
        <DashboardCard
          title="Earnings"
          value="₹ --"
        />
      </div>

      {/* 🌱 Crop Listings Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          My Crop Listings
        </h2>

        {/* Filters */}
        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "font-bold text-green-600" : ""}
          >
            All
          </button>
          <button
            onClick={() => setFilter("available")}
            className={filter === "available" ? "font-bold text-green-600" : ""}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("sold")}
            className={filter === "sold" ? "font-bold text-green-600" : ""}
          >
            Sold
          </button>
        </div>
      </div>

      {/* 🌾 Crop Cards */}
      {filteredCrops.length === 0 ? (
        <p className="text-gray-500">No crops found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCrops.map((crop) => (
            <CropCard
              key={crop._id}
              crop={crop}
              onEdit={() =>
                navigate(`/farmers/edit-crop/${crop._id}`)
              }
              onRefresh={fetchDashboard}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;
