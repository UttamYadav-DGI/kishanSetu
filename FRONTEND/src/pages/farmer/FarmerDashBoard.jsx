import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Sprout,
  IndianRupee,
  Package,
  Filter,
  ShoppingBag,
  Loader2,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../../context/Authcontext";
import CropCard from "../../component/CropCard"; 
import api from "../../Services/Api";

const FarmerDashboard = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Redirect if farmer profile not completed
  useEffect(() => {
    if (dashboard && !dashboard.farmerProfile) {
      // No state passed here, so FarmerProfile treats it as 'onboarding'
      navigate("/farmers/profile");
    }
  }, [dashboard, navigate]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/api/v1/farmers/dashboard", {
        withCredentials: true,
      });
      setDashboard(res.data.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/users/logout", {}, { withCredentials: true });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-green-600">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="font-medium text-gray-600">Loading your farm data...</p>
      </div>
    );
  }

  if (!dashboard)
    return <div className="text-center mt-10">Failed to load data.</div>;

  const { user, crops, totalCrops, activeCrops, earnings } = dashboard;

  // Filter Logic
  const filteredCrops =
    filter === "all"
      ? crops.filter((crop) => crop.status !== "sold")
      : crops.filter((crop) => crop.status === filter);

  // Reusable Stat Card Component (Internal)
  const StatCard = ({ title, value, icon: Icon, color, subText }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {subText && (
          <p
            className={`text-xs mt-2 ${
              color === "green" ? "text-green-600" : "text-gray-400"
            }`}
          >
            {subText}
          </p>
        )}
      </div>
      <div
        className={`p-3 rounded-lg ${
          color === "green"
            ? "bg-green-100 text-green-600"
            : color === "blue"
            ? "bg-blue-100 text-blue-600"
            : color === "yellow"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-purple-100 text-purple-600"
        }`}
      >
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* 🔝 Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* User Intro */}
            <div className="flex items-center gap-4">
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-12 h-12 bg-green-600 text-white flex items-center justify-center rounded-full cursor-pointer font-bold text-lg"
                >
                  FU
                </div>

                {profileOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-xl border">
                    {/* 👇👇👇 THE FIX IS HERE 👇👇👇 */}
                    <button
                      onClick={() =>
                        // We pass 'state' so FarmerProfile knows we are editing, not onboarding
                        navigate("/farmers/profile", { state: { mode: "edit" } })
                      }
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit Profile
                    </button>

                    <button
                      onClick={() => navigate("/farmers/dashboard")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.Name?.split(" ")[0]}! 👋
                </h1>
                <p className="text-gray-500 text-sm flex items-center mt-1">
                  <LayoutDashboard className="w-3 h-3 mr-1" /> Farmer Dashboard
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/farmers/orders")}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                Orders Received
              </button>
              <button
                onClick={() => navigate("/farmers/add-crop")}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4" />
                Add New Crop
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* 📊 Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Listings"
            value={totalCrops}
            icon={Sprout}
            color="green"
            subText="Lifetime crops added"
          />
          <StatCard
            title="Active Crops"
            value={activeCrops}
            icon={Package}
            color="blue"
            subText="Currently in marketplace"
          />
          <StatCard
            title="Crops Sold"
            value={totalCrops - activeCrops}
            icon={TrendingUp}
            color="purple"
            subText="Completed sales"
          />
          <StatCard
            title="Total Earnings"
            value={`₹ ${earnings?.toLocaleString() || 0}`}
            icon={IndianRupee}
            color="yellow"
            subText="Revenue generated"
          />
        </div>

        {/* 🌱 Crop Listings Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Filter className="w-5 h-5 mr-2 text-gray-500" />
            My Listings
          </h2>

          {/* Tab Filter */}
          <div className="bg-white p-1 rounded-lg border border-gray-200 inline-flex shadow-sm">
            {[
              { id: "all", label: "All Active" },
              { id: "available", label: "Available" },
              { id: "sold", label: "Sold Out" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filter === tab.id
                    ? "bg-green-100 text-green-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🌾 Crop Cards Grid */}
        {filteredCrops.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-gray-400 w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No crops found
            </h3>
            <p className="text-gray-500 mt-1">
              You don't have any crops in this category yet.
            </p>
            {filter === "all" && (
              <button
                onClick={() => navigate("/farmers/add-crop")}
                className="mt-4 text-green-600 font-medium hover:underline"
              >
                Add your first crop now
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCrops.map((crop) => (
              <CropCard
                key={crop._id}
                crop={crop}
                onEdit={() => navigate(`/farmers/edit-crop/${crop._id}`)}
                onRefresh={fetchDashboard}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;