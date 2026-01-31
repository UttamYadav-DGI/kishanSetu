import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCropDetailsForBuyer } from "../../Services/buyerApi.js";
import { useNavigate } from "react-router-dom";

const CropDetails = () => {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    fetchCrop();
  }, [id]);

  const fetchCrop = async () => {
    try {
      const res = await getCropDetailsForBuyer(id);
      setCrop(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!crop) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold capitalize">{crop.cropName}</h1>
        <p className="text-gray-600 mt-2">📍 {crop.location}</p>
        <p className="font-semibold mt-2">₹{crop.pricePerKg}/kg</p>
        <p className="text-sm mt-2">Quantity: {crop.quantity} kg</p>
        <p className="text-sm mt-2">Status: {crop.status}</p>

        <button
        onClick={() => navigate(`/buyers/order/${crop._id}`)}
        className="mt-5 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Place Order
      </button>

      </div>
    </div>
  );
};

export default CropDetails;
