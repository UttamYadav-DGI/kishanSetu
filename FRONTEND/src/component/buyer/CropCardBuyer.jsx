import React from "react";
import { useNavigate } from "react-router-dom";

const CropCardBuyer = ({ crop }) => {
  const navigate = useNavigate();

  const farmer = crop?.farmerId; // populated farmer info

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="text-lg font-bold capitalize">{crop.cropName}</h3>

      <p className="text-sm text-gray-600">📍 {crop.location}</p>
      <p className="text-sm font-semibold mt-1">₹{crop.pricePerKg}/kg</p>
      <p className="text-xs text-gray-500 mt-1">Status: {crop.status}</p>

      {/* ✅ Farmer Info */}
      {farmer && (
        <div className="mt-3 bg-gray-50 border rounded-lg p-3">
          <p className="text-sm font-semibold text-green-700">
            Farmer Details 👨‍🌾
          </p>
          <p className="text-sm">Name: {farmer?.Name}</p>
          <p className="text-sm">Phone: {farmer?.PhoneNo}</p>
          <p className="text-sm">Email: {farmer?.EmailId}</p>
          {/* <p className="text-sm">Address: {farmer.Address}</p> */}
        </div>
      )}

      <button
        onClick={() => navigate(`/buyers/marketplace/${crop._id}`)}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        View Details
      </button>
    </div>
  );
};

export default CropCardBuyer;
