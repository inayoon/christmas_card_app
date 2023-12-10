import React from "react";

export default function Envelope() {
  return (
    <div className="flex items-center justify-center pt-8 h-full">
      <div className="bg-red-700  w-1/2  p-8 rounded-2xl shadow-lg mb-8 h-full">
        <div className="mx-auto flex flex-col justify-between max-w-md h-60 bg-amber-400 border-2 border-neutral-800 border-solid shadow-md">
          <div className="flex">
            <div className="p-4" id="home_banner">
              To.{" "}
            </div>
            <input
              className="mt-1 p-2 bg-transparent border-b-2 border-neutral-800 w-32 h-12 text-sm placeholder-white"
              type="text"
              placeholder="Recipient's name"
            />
          </div>

          <div className="p-4 ml-40" id="home_banner">
            From.{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
