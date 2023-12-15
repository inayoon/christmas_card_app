import React, { useState } from "react";
import {
  signInSuccess,
  signInStart,
  signInFailure,
} from "../../redux/user/userSlice.js";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth.jsx";

export default function Signin() {
  const [form, setForm] = useState();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data));
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInSuccess(error));
    }
  };
  return (
    <div className="p-4 mx-auto max-w-lg">
      <h1 className="text-4xl text-center my-4 text-teal-600">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="bg-emerald-700  p-4 rounded-lg text-white placeholder-white shadow-md"
          type="email"
          placeholder="Enter your Email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="bg-emerald-600  p-4 rounded-lg text-white placeholder-white shadow-md"
          type="password"
          placeholder="Enter your Password"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-red-700 text-white p-3 rounded-lg hover:text-yellow-300 hover:font-bold disabled:opacity-60 relative group">
          {loading ? "Loading..." : "Sign In"}
          <span className="absolute right-60 top-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-xl">
            🎄
          </span>
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-2">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600">
        {error ? error.message || "Something went wrong" : ""}
      </p>
    </div>
  );
}
