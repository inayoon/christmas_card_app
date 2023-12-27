import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCardState,
  selectCard,
  saveLetter,
} from "../../redux/card/cardSlice.js";
import cardData from "../data/card.json";

export default function CardPicked() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, url, letter } =
    useSelector(selectCardState).selectedCard || {};
  const [selectedImageTitle, setSelectedImageTitle] = useState(title);

  const handleDropdownChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedImageTitle(selectedTitle);
    const selectedCard = cardData.find((card) => card.title === selectedTitle);
    dispatch(selectCard(selectedCard));
  };

  const handleAvatar = () => {
    navigate("/envelope");
  };

  const handleLetterChange = (e) => {
    dispatch(saveLetter({ letter: e.target.value }));
  };
  useEffect(() => {
    setSelectedImageTitle(title);
  }, [title]);

  return (
    <div className="flex flex-col items-center justify-center pt-8 h-full ">
      <div className="bg-red-700 max-w-lg md:w-2/3 h-full p-4 md:p-8 rounded-2xl shadow-lg mb-8 flex flex-col overflow-y-auto no-scrollbar">
        <div
          className="text-center text-2xl md:text-3xl text-green-700 text-outline-white mb-4"
          id="home"
        >
          Ho Ho Ho! <br />
          Merry Christmas 💌
        </div>
        <div>
          <img
            className="max-w-sm max-h-44 mx-auto p-2"
            src={url}
            alt={title}
          />
        </div>
        <div>
          <select
            className="mt-2 rounded-md text-sm bg-red-300 cursor-pointer "
            value={selectedImageTitle}
            onChange={handleDropdownChange}
          >
            {cardData.map((card, index) => (
              <option key={index} value={card.title}>
                {card.title}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center flex-grow">
          <textarea
            placeholder="Write your letter.."
            value={letter}
            onChange={handleLetterChange}
            className="w-full h-32 px-4 mt-4 py-2 rounded-lg shadow-md bg-lime-800 text-outline-white focus:outline-none focus:text-green-400 overflow-y-auto"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleAvatar}
            className="bg-lime-700 rounded-lg mt-4 p-2 md:mt-2 md:ml-4 shadow-md text-white flex-shrink-0"
          >
            Add your avatar
          </button>
        </div>
      </div>
    </div>
  );
}
