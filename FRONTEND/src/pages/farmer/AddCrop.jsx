import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../Services/Api";
const AddCrop = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    pricePerKg: "",
    location: "",
    availableFrom: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post(
        "/api/v1/crops/crops",
        formData,
        { withCredentials: true }
      );

      setMessage("✅ Crop added successfully");
      setTimeout(() => {
        navigate("/farmers/dashboard");
      }, 1000);

    } catch (error) {
      setMessage("❌ Failed to add crop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Crop 🌱</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Crop Name</label>
          <input
            type="text"
            name="cropName"
            value={formData.cropName}
            onChange={handleChange}
            placeholder="Wheat, Rice, Potato"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Quantity (kg)</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            placeholder="minimum quantity is 1kg"
            min="1"
            step="1" //min="1" → browser won’t allow values less than 1 using arrows step="1" → prevents decimals
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price per Kg (₹)</label>
          <input
            type="number"
            name="pricePerKg"
            value={formData.pricePerKg}
            onChange={handleChange}
            placeholder="minimum price (₹)10 per Kg"
            min="10"
            step="1"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="District / State"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Available From
          </label>
          <input
            type="date"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Adding..." : "Add Crop"}
        </button>

        {message && (
          <p className="text-sm mt-2">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddCrop;
