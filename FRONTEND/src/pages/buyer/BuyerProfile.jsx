import React, { useState } from "react";
import { setBuyerProfile } from "../../Services/buyerApi";
import { useNavigate } from "react-router-dom";

const BuyerProfile = () => {
  const [Address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!Address.trim()) return alert("Address required");

    try {
      setLoading(true);
      await setBuyerProfile({ Address });
      alert("Profile saved ✅");
      navigate("/buyers/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Buyer Profile</h1>

        <label className="block text-sm font-medium mb-1">Address</label>
        <textarea
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded-lg p-3"
          rows="4"
          placeholder="Enter your full address..."
        />

        <button
          disabled={loading}
          onClick={handleSave}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
};

export default BuyerProfile;
