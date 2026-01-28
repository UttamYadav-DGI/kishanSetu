import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import api from "../Services/Api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  // ✅ optional role coming from Navbar (role modal)
  const selectedRole = location.state?.role || "";

  const [formData, setFormData] = useState({
    identifier: "",
    Password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const redirectByRole = (role) => {
    if (role === "farmer") navigate("/farmers/dashboard");
    else if (role === "buyer") navigate("/buyers/dashboard");
    else if (role === "admin") navigate("/admin/dashboard");
    else navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Reset messages
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

      const response = await api.post(
        "/api/v1/users/login",
        formData,
        { withCredentials: true }
      );

      const token = response.data?.data?.accessToken;
      const userRole =
        response.data?.data?.user?.Role || response.data?.data?.user?.role;

      // ✅ If role modal selected, verify role match
      if (selectedRole && userRole && selectedRole !== userRole) {
        setSuccess(""); // ✅ important fix
        setError(`You selected "${selectedRole}" but logged in as "${userRole}"`);
        return;
      }

      setSuccess("Login successful!");
      loginUser(response.data.data.user);

      setTimeout(() => {
        redirectByRole(userRole);
      }, 600);

    } catch (err) {
      setSuccess(""); // ✅ important fix
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">
          KishanSetu Login
        </h2>

        {/* ✅ Show selected role (optional UI) */}
        {selectedRole && (
          <p className="text-center text-sm text-gray-500 mb-5">
            Logging in as: <span className="font-semibold">{selectedRole}</span>
          </p>
        )}

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
            placeholder="PhoneNo / EmailId"
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
