import React from "react";
import { useLocation } from "react-router-dom";

export default function CardPicked() {
  const location = useLocation();
  const { title, url } = location.state.myCard;
  console.log(title, url);
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
        {/* 여기에 추가적인 컨텐츠를 채워넣을 수 있습니다. */}
      </div>
    </div>
  );
}
