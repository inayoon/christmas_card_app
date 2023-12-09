import React from "react";
import { useSelector } from "react-redux";
import { selectCardState } from "../../redux/card/cardSlice.js";

export default function CardPicked() {
  const { title, url } = useSelector(selectCardState).selectedCard;

  return (
    <div className="flex items-center justify-center pt-8 ">
      <div className="bg-red-700  w-1/2 h-screen p-8 rounded-2xl shadow-lg ">
        <div
          className="text-center text-3xl text-green-700 text-outline-white"
          id="home"
        >
          Ho Ho Ho! <br />
          Merry Christmas 💌
        </div>
        <div>
          <img className="max-w-xs mx-auto" src={url} alt={title} />
        </div>
      </div>
    </div>
  );
}
