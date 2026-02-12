import React, { useState } from "react";
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
    let value = e.target.value;

    // Prevent multiple crop names using commas
    if (e.target.name === "cropName") {
      value = value.replace(/,/g, "");
    }

    // Prevent only numbers in location
    if (e.target.name === "location") {
      if (/^\d+$/.test(value)) {
        return;
      }
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const cropName = formData.cropName.trim();

    // Only one word crop name
    if (cropName.split(" ").length > 1) {
      setMessage("❌ Please enter only one crop name");
      setLoading(false);
      return;
    }

    // Location validation
    if (/^\d+$/.test(formData.location)) {
      setMessage("❌ Location cannot be only numbers");
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/v1/crops/crops", formData, {
        withCredentials: true,
      });

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
            placeholder="Wheat"
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
            min="1"
            step="1"
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
            min="10"
            step="1"
            onChange={handleChange}
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
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Available From</label>
          <input
            type="date"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Adding..." : "Add Crop"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default AddCrop;
