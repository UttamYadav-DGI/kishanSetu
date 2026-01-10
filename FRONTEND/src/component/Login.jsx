import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "", // email or phone
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.identifier) {
      setError("Either EmailId or Phone number is required");
      return;
    }

    if (!formData.Password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formData,
        { withCredentials: true }
      );

      setSuccess("Login successful!");
      console.log("User Data:", response.data);

      // Optional redirect after login
      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          KishanSetu Login
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
            name="identifier"
            placeholder="PhoneNo./ EmailId"
            value={formData.identifier}
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
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full text-green-700 underline mt-2"
          >
            Don’t have an account? Register
          </button>
        </form>
      </div>
    </div>
  );
}
