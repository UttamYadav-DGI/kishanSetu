import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../Services/Api";

export default function Register() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    PhoneNo: "",
    EmailId: "",
    Password: "",
    Address:"",
    Role:"farmer",
    avatar: null, // optional image
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image input
  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };
// };
    // Basic validation
    const validateForm=()=>{

    if (!formData.Name || !formData.PhoneNo || !formData.EmailId || !formData.Password) {
      return "All fields except image are mandatory";
    }
    if (!/^[0-9]{10}$/.test(formData.PhoneNo)) {
      return "Phone number must be exactly 10 digit character not allowed";
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.EmailId)) {
      return "Invalid email address";
    }

    if (formData.Password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
    };
   

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }


    try {
      setLoading(true);

      // IMPORTANT: multipart/form-data
      const data = new FormData();
      data.append("Name", formData.Name);
      data.append("PhoneNo", formData.PhoneNo);
      data.append("EmailId", formData.EmailId);
      data.append("Role",formData.Role);
      data.append("Address",formData.Address);
      data.append("Password", formData.Password);

      if (formData.avatar) {
        data.append("avatar", formData.avatar);
      }

      const response = await api.post(
        "/api/v1/users/register",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess("Registration successful!");
      console.log("Response:", response.data);

      // Optional: reset form
      setFormData({
        Name: "",
        PhoneNo: "",
        EmailId: "",
        Role:"",
        Password: "",
        avatar: null,
      });

    } catch (err) {
  const message = err.response?.data?.message;
    alert(message)
    setError(message);
  }
  finally{
    setLoading(false);
  }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          KishanSetu Register
        </h2>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 text-sm text-green-600 bg-green-100 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="Name"
            placeholder="Full Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="text"
            name="PhoneNo"
            placeholder="Phone Number"
            value={formData.PhoneNo}
            onChange={handleChange}
            maxLength={10}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            name="EmailId"
            placeholder="Email ID"
            value={formData.EmailId}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
          name="Role"
          value={formData.Role}
          onChange={handleChange}
          className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
          >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
        </select>

         <input
            type="text"
            name="Address"
            placeholder="Address"
            value={formData.Address}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* Optional Image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full text-green-700 underline mt-2"
          >
           Have an Account? SignIn
          </button>
        </form>
      </div>
    </div>
  );
};