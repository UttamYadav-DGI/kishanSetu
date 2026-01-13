import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/Api";
const EditCrop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    pricePerKg: "",
    location: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCrop();
  }, []);

  const fetchCrop = async () => {
    try {
      const res = await api.get(
        `/api/v1/farmers/dashboard`,
        { withCredentials: true }
      );

      const crop = res.data.data.crops.find(c => c._id === id);

      if (!crop) return alert("Crop not found");

      setFormData({
        cropName: crop.cropName,
        quantity: crop.quantity,
        pricePerKg: crop.pricePerKg,
        location: crop.location || ""
      });
    } catch (error) {
      alert("Failed to load crop");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.get(
        `/api/v1/farmers/crops`,
        formData,
        { withCredentials: true }
      );
      navigate("/farmers/dashboard");
    } catch (error) {
      alert("Failed to update crop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Crop 🌱</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="cropName"
          value={formData.cropName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Crop Name"
          required
        />

        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Quantity"
          required
        />

        <input
          type="number"
          name="pricePerKg"
          value={formData.pricePerKg}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Price per Kg"
          required
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Location"
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Crop"}
        </button>
      </form>
    </div>
  );
};

export default EditCrop;
