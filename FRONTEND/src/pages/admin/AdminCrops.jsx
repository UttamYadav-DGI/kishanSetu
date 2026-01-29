import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSlidebar";
import { deleteCropByAdmin, getAllCrops } from "../../Services/adminApi";

const AdminCrops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    const res = await getAllCrops();
    setCrops(res.data.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this crop?")) return;

    await deleteCropByAdmin(id);
    fetchCrops();
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">All Crops</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {crops.map((c) => (
            <div key={c._id} className="bg-white shadow rounded-xl p-4">
              <h2 className="font-bold capitalize">{c.cropName}</h2>
              <p className="text-sm text-gray-600">📍 {c.location}</p>
              <p className="text-sm">₹{c.pricePerKg}/kg</p>

              <button
                onClick={() => handleDelete(c._id)}
                className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Delete Crop
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCrops;
