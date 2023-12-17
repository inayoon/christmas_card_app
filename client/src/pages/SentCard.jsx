import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCardState } from "../../redux/card/cardSlice.js";

export default function SentCard() {
  const { title, url, letter, recipient } =
    useSelector(selectCardState).selectedCard;
  console.log(title);
  return (
    <div className="flex items-center justify-center pt-8 h-full">
      <div className="bg-red-700  w-1/2  p-8 rounded-2xl shadow-lg mb-8 h-full">
        <h1 className="text-2xl text-center mb-2 text-lime-900 text-outline-white">
          {`A letter has arrived for ${recipient}`}
        </h1>
        <div className="mx-auto flex flex-col justify-between max-w-sm bg-amber-400 border-2 border-neutral-800 border-solid shadow-md">
          <div className="flex">
            <div className="p-4" id="home_banner">
              🎄To.{" "}
            </div>
            <input
              className="mt-1 p-2 bg-transparent border-b-2 border-neutral-800 w-32 h-12 text-sm placeholder-white"
              type="text"
              id="recipient"
              placeholder="Recipient's name"
            />
          </div>
          <div className="flex justify-end mx-8 mt-32 pb-2">
            <div className="p-4" id="home_banner">
              From.
            </div>

            <img
              className="h-14 w-14  self-center cursor-pointer rounded-full object-cover"
              src={""}
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
