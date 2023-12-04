import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-red-700">
      <div className="flex justify-between items-center max-w-6xl p-4">
        <Link to="/">
          <h1
            id="home"
            className="text-4xl font-bold text-lime-800 text-outline-white"
          >
            Send Your Christmas Card
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li id="home" className="text-lg text-white hover:text-yellow-100">
              Home
            </li>
          </Link>
          <Link to="/sign-in">
            <li id="home" className="text-lg text-white hover:text-yellow-100">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
