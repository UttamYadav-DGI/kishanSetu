import React, { useEffect, useState } from "react";
import AdminSidebar from "../../component/admin/AdminSlidebar";
import {
  getAllSchemes,
  createScheme,
  deleteScheme,
} from "../../Services/adminSchemeApi";

const AdminSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    const res = await getAllSchemes();
    setSchemes(res.data.data);
  };

  const handleAddScheme = async () => {
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

  const handleDelete = async (id) => {
    await deleteScheme(id);
    fetchSchemes();
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Manage Government Schemes
        </h1>

        {/* Add Scheme Form */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">
          <input
            placeholder="Scheme title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Apply link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <button
            onClick={handleAddScheme}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Scheme
          </button>
        </div>

        {/* Scheme List */}
        <div className="space-y-4">
          {schemes.map((s) => (
            <div
              key={s._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between"
            >
              <div>
                <h2 className="font-bold">{s.title}</h2>
                <p className="text-sm text-gray-600">{s.description}</p>
                <p className="text-xs">Deadline: {s.deadline}</p>
              </div>

              <button
                onClick={() => handleDelete(s._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSchemes;
