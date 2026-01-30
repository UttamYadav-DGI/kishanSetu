import React, { useEffect, useState } from "react";
import { getBuyerProfile, setBuyerProfile } from "../../Services/buyerApi";
import { useNavigate } from "react-router-dom";

const BuyerProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Address: "",
    City: "",
    State: "",
    Pincode: "",
    preferredCrops: "",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Load profile data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getBuyerProfile();
      const profile = res.data.data;

      // ✅ user details (coming from populate)
      setUserInfo(profile.userId);

      // ✅ profile details
      setFormData({
        Address: profile.Address || "",
        City: profile.City || "",
        State: profile.State || "",
        Pincode: profile.Pincode || "",
        preferredCrops: profile.preferredCrops?.join(", ") || "",
      });

    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to load profile");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    if (!formData.Address.trim()) return alert("Address is required");

    try {
      setLoading(true);

      // ✅ Convert preferredCrops string into array
      const payload = {
        ...formData,
        preferredCrops: formData.preferredCrops
          ? formData.preferredCrops.split(",").map((c) => c.trim())
          : [],
      };

      await setBuyerProfile(payload);

      alert("✅ Buyer profile updated successfully");
      navigate("/buyers/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-1">Buyer Profile</h1>
        <p className="text-sm text-gray-500 mb-6">
          Update your details to get better crop suggestions ✅
        </p>

        {/* ✅ Basic User Info (Read-only) */}
        {userInfo && (
          <div className="bg-gray-50 border rounded-lg p-4 mb-6">
            <p className="text-sm">
              <span className="font-semibold">Name:</span> {userInfo.Name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Email:</span> {userInfo.EmailId}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Phone:</span> {userInfo.PhoneNo}
            </p>
          </div>
        )}

        {/* ✅ Editable Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address *</label>
            <textarea
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              rows="3"
              placeholder="Enter full address..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                name="City"
                value={formData.City}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="City"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                name="State"
                value={formData.State}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="State"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                name="Pincode"
                value={formData.Pincode}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Pincode"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Preferred Crops (optional)
            </label>
            <input
              name="preferredCrops"
              value={formData.preferredCrops}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="e.g. wheat, rice, sugarcane"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use comma separated values like: wheat, rice, potato
            </p>
          </div>
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            disabled={loading}
            onClick={handleSave}
            className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => navigate("/buyers/dashboard")}
            className="w-1/2 border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
