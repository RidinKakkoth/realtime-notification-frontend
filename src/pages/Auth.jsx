import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignUp } from "../api/userEndpoints";

const Auth = ({ type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "signup") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      try {
        const result = await userSignUp(
          formData.name,
          formData.email,
          formData.password
        );
        if (result.success) {
          navigate("/");
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("An error occurred while signing up.");
      }
    } else if (type === "login") {
      try {
        const result = await userLogin(formData.email, formData.password);
        if (result.success) {
          const { token, user } = result;

          dispatch(
            login({
              token: token,
              user: user, // The entire user object (which includes role, id, name, etc.)
            })
          );
          navigate("/");
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full sm:w-[400px] mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {type === "signup" ? "Sign Up" : "Log In"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
        </div>

        {type === "signup" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          >
          {type === "signup" ? "Sign Up" : "Log In"}
        </button>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      </form>

      <div className="mt-4 text-center">
        <span>
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <a
            href={type === "signup" ? "/login" : "/signup"}
            className="text-blue-500"
            >
            {type === "signup" ? "Log In" : "Sign Up"}
          </a>
        </span>
      </div>
    </div>
            </div>
  );
};

export default Auth;
