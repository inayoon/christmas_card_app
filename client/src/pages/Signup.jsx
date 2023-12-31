import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [form, setForm] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      //fetch 말고 axios 사용하는걸로 나중에 바꿔보기
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return setError(true);
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className="p-4 mx-auto max-w-lg">
      <h1 className="text-4xl text-center my-4 text-teal-600">Sign Up</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <input
          className="bg-emerald-600  p-4 rounded-lg text-white placeholder-white shadow-md"
          type="text"
          placeholder="Enter your Username"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
          <span className="absolute right-60 top-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-xl">
            🎄
          </span>
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <p className="text-red-600">{error && "Something went wrong"}</p>
    </div>
  );
}
