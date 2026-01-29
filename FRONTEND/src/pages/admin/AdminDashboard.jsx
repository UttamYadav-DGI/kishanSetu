import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSlidebar";
import AdminStatCard from "../../component/admin/AdminStatCard";
import { getAdminDashboard } from "../../Services/adminApi.js";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getAdminDashboard();
      setStats(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <AdminStatCard title="Total Users" value={stats.totalUsers} />
          <AdminStatCard title="Farmers" value={stats.totalFarmers} />
          <AdminStatCard title="Buyers" value={stats.totalBuyers} />
          <AdminStatCard title="Crops Listed" value={stats.totalCrops} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
