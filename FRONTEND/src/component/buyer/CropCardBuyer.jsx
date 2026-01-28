import React from "react";
import { useNavigate } from "react-router-dom";

const CropCardBuyer = ({ crop }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="text-lg font-bold capitalize">{crop.cropName}</h3>
      <p className="text-sm text-gray-600">📍 {crop.location}</p>
      <p className="text-sm font-semibold mt-1">₹{crop.pricePerKg}/kg</p>
      <p className="text-xs text-gray-500 mt-1">Status: {crop.status}</p>

      <button
        onClick={() => navigate(`/buyers/crop/${crop._id}`)}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        View Details
      </button>
    </div>
  );
};

export default CropCardBuyer;
