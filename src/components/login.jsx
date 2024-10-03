import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SignIn = () => {
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
        <form>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
            style={{ backgroundColor: "#01231F" }} // Change button color
          >
            Sign In
          </button>
        </form>
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
