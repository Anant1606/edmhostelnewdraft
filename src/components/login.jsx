import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ApiService from "../api/apiService";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Full response:", response);

      const { result_code, result } = response;

      if (result_code === 0 && result.title === 'SUCCESS') {
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);
        setError(null);
        navigate("/RoomList");
      } else {
        setError(result.message || "An error occurred during login.");
      }
    } catch (err) {
      console.error("Error during login:", err.response);
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred during login. Please try again.");
      }
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
          >
            Sign In
          </button>
        </form>

        <div className="mt-4">
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>

        <div className="mt-6">
          <div className="relative flex justify-center text-sm">
            <p className="text-center text-sm text-gray">
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