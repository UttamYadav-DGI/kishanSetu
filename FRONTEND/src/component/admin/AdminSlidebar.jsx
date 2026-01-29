import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen p-4">
      <h2 className="text-xl font-bold text-green-700 mb-6">Admin Panel</h2>

      <div className="flex flex-col gap-3">
        <Link to="/admin/dashboard" className="hover:text-green-600">
          Dashboard
        </Link>
        <Link to="/admin/users" className="hover:text-green-600">
          Users
        </Link>
        <Link to="/admin/crops" className="hover:text-green-600">
          Crops
        </Link>
        <Link to="/admin/farmers" className="hover:text-green-600">
        Farmer Verification
        </Link>

      </div>
    </div>
  );
};

export default AdminSidebar;
