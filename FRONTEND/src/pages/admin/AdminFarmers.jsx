import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSlidebar";
import { getAllFarmersForAdmin, verifyFarmer } from "../../Services/adminApi";

const AdminFarmers = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    const res = await getAllFarmersForAdmin();
    setFarmers(res.data.data);
  };

  const handleVerify = async (id, status) => {
    await verifyFarmer(id, status);
    fetchFarmers();
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Farmer Verification ✅</h1>

        <div className="bg-white shadow rounded-xl p-4 space-y-4">
          {farmers.map((f) => (
            <div
              key={f._id}
              className="border p-4 rounded-lg flex flex-col md:flex-row md:justify-between gap-4"
            >
              <div>
                <p className="font-bold">{f.userId?.Name}</p>
                <p className="text-sm text-gray-600">{f.userId?.EmailId}</p>
                <p className="text-sm text-gray-600">{f.userId?.PhoneNo}</p>
                <p className="text-sm">
                  Status:{" "}
                  <span className={f.verified ? "text-green-600" : "text-red-600"}>
                    {f.verified ? "Verified ✅" : "Not Verified ❌"}
                  </span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleVerify(f._id, true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleVerify(f._id, false)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFarmers;
