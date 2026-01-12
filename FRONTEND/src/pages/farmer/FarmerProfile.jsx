import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../Services/Api";

const FarmerProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    LandSize: "",
    CropGrown: "",
    Experience: "",
    Location: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 OPTIONAL: check if profile already exists
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get(
        "/api/v1/farmers/dashboard",
        { withCredentials: true }
      );

      const profile = res.data?.data?.farmerProfile;

      // If profile exists → redirect to dashboard
      if (profile) {
        navigate("/farmer/dashboard");
      }
    } catch (error) {
      console.log("Profile not found, continue onboarding");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post(
        "/api/v1/farmers/profile",
        {
          ...formData,
          CropGrown: formData.CropGrown
            .split(",")
            .map((c) => c.trim())
            .filter(Boolean),
        },
        { withCredentials: true }
      );

      setMessage("✅ Profile saved successfully");
      navigate("/farmers/dashboard");
    } catch (error) {
      setMessage("❌ Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Complete Your Farmer Profile 🌾
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Land Size */}
        <div>
          <label className="block text-sm font-medium">
            Land Size (in acres)
          </label>
          <input
            type="number"
            name="LandSize"
            value={formData.LandSize}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Crops */}
        <div>
          <label className="block text-sm font-medium">
            Crops Grown (comma separated)
          </label>
          <input
            type="text"
            name="CropGrown"
            value={formData.CropGrown}
            onChange={handleChange}
            placeholder="Wheat, Rice, Sugarcane"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium">
            Experience (years)
          </label>
          <input
            type="number"
            name="Experience"
            value={formData.Experience}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default FarmerProfile;
