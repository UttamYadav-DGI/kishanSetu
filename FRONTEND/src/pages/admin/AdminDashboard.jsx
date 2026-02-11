import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSlidebar";
import AdminStatCard from "../../component/admin/AdminStatCard";
import { getAdminDashboard } from "../../Services/adminApi";
import {
  getAllSchemes,
  createScheme,
  deleteScheme,
} from "../../Services/adminSchemeApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [schemes, setSchemes] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchStats();
    fetchSchemes();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getAdminDashboard();
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSchemes = async () => {
    const res = await getAllSchemes();
    setSchemes(res.data.data);
  };

  const handleAddScheme = async () => {
    if (!title || !description) return;

    await createScheme({
      title,
      description,
      deadline,
      link,
    });

    setTitle("");
    setDescription("");
    setDeadline("");
    setLink("");

    fetchSchemes();
  };

  const handleDeleteScheme = async (id) => {
    await deleteScheme(id);
    fetchSchemes();
  };

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6 space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <AdminStatCard title="Total Users" value={stats.totalUsers} />
          <AdminStatCard title="Farmers" value={stats.totalFarmers} />
          <AdminStatCard title="Buyers" value={stats.totalBuyers} />
          <AdminStatCard title="Crops Listed" value={stats.totalCrops} />
        </div>

        {/* SCHEME MANAGEMENT */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Manage Schemes</h2>

          {/* Add scheme form */}
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <input
              placeholder="Scheme Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Apply Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <button
            onClick={handleAddScheme}
            className="bg-green-600 text-white px-4 py-2 rounded mb-4"
          >
            Add Scheme
          </button>

          {/* Scheme list h  form map*/}
          <div className="space-y-3">
            {schemes.map((scheme) => (
              <div
                key={scheme._id}
                className="border p-3 rounded flex justify-between"
              >
                <div>
                  <p className="font-semibold">{scheme.title}</p>
                  <p className="text-sm text-gray-600">
                    {scheme.description}
                  </p>
                  <p className="text-xs">Deadline: {scheme.deadline}</p>
                </div>

                <button
                  onClick={() => handleDeleteScheme(scheme._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
