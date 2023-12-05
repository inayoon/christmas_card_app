import React, { useState } from "react";
import Cards from "../components/Cards";

export default function Home() {
  const [sentCard, setSentCard] = useState(0);
  return (
    <div>
      <p className="text-center py-4  font-bold text-xl" id="home_banner">
        Merry Christmas!🎄
        <br />
        Express Your Heartfelt Wishes With a Christmas Card
      </p>
      <img
        className="max-w-sm mx-auto rounded-xl shadow-md"
        src="../../public/95704.jpg"
      />
      <div className="text-center pt-1">
        Sent{" "}
        <span className="text-red-700 underline decoration-dashed decoration-red-700 font-bold text-lg">
          {sentCard}
        </span>{" "}
        cards so far!
      </div>
      <div>
        <p>Christmas Cards💌</p>
        <Cards />
      </div>
    </div>
  );
}
