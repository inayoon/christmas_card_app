import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  const [form, setForm] = useState();
  return (
    <div className="p-4 mx-auto max-w-lg">
      <h1 className="text-4xl text-center my-4 text-teal-600">Sign In</h1>
      <form className="flex flex-col gap-2">
        <input
          className="bg-emerald-700  p-4 rounded-lg text-white placeholder-white shadow-md"
          type="email"
          placeholder="Enter your Email"
          id="email"
        />
        <input
          className="bg-emerald-600  p-4 rounded-lg text-white placeholder-white shadow-md"
          type="password"
          placeholder="Enter your Password"
          id="password"
        />
        <button className="bg-red-700 text-white p-3 rounded-lg hover:text-yellow-300 hover:font-bold disabled:opacity-60">
          Sign In
        </button>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
