import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSlidebar";
import { getAllUsers, toggleBlockUser } from "../../Services/adminApi";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id) => {
    try {
      await toggleBlockUser(id);
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Failed to update user block status");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>

        {loading ? (
          <p className="text-center mt-10">Loading users...</p>
        ) : (
          <div className="bg-white shadow rounded-xl p-4 space-y-3">
            {users.length === 0  ? (
              <p className="text-gray-500">No users found</p>
            ) : (
              users.filter((u)=>u.Role!=="admin")
              .map((u) => (
                <div
                  key={u._id}
                  className="border p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  {/* User Info */}
                  <div className="text-sm">
                    <p className="font-semibold text-base">{u.Name}</p>
                    <p className="text-gray-600">{u.EmailId}</p>
                    <p className="text-gray-600">{u.PhoneNo}</p>

                    <p className="mt-1">
                      Role:{" "}
                      <span className="text-green-600 font-medium">
                        {u.Role}
                      </span>
                    </p>

                    <p
                      className={`mt-1 font-medium ${
                        u.isBlocked ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {u.isBlocked ? "Blocked ❌" : "Active ✅"}
                    </p>
                  </div>

                  {/* Block Button */}
                  <button
                    onClick={() => handleBlock(u._id)}
                    className={`px-5 py-2 rounded-lg text-white ${
                      u.isBlocked
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
