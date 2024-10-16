import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../api/apiService";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on form submit
    setLoading(true); // Start loading

    try {
      const response = await ApiService.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Log full response for debugging
      console.log("Full response:", response);

      // Destructure response
      const { result_code, result } = response.data; // Assuming result_code and result are inside response.data

      // Check if the login was successful
      if (result_code === 0 && result.title === "SUCCESS") {
        // Store tokens in localStorage
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);

        // Redirect to the dashboard or home page upon successful login
        navigate("/dashboard"); // Updated to redirect to /dashboard
      } else {
        // If login fails, display the error message
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err.response);

      // Show error from backend or fallback message
      if (err.response && err.response.data && err.response.data.result && err.response.data.result.message) {
        setError(err.response.data.result.message); // Adjusted to match your response structure
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ backgroundColor: "#032A25", minHeight: "130vh" }}
    >
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <svg
            className="w-10 h-10"
            style={{ color: "#032A25" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
            style={{ backgroundColor: "#01231F" }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Signing In..." : "Sign In"} {/* Button text changes based on loading state */}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative flex justify-center text-sm">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium"
                style={{ color: "#01231F" }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;