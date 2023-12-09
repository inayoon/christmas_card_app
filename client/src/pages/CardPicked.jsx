import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CardPicked() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { title, url } = location.state.myCard;

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
          <img className="max-w-xs mx-auto" src={url} />
        </div>
      </div>
    </div>
  );
}
