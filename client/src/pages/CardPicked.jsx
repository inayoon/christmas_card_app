import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCardState, selectCard } from "../../redux/card/cardSlice.js";
import cardData from "../data/card.json";

export default function CardPicked() {
  const selectedCardInfo = useSelector(selectCardState).selectedCard;
  const { title, url } = useSelector(selectCardState).selectedCard;
  const dispatch = useDispatch();
  const [selectedImageTitle, setSelectedImageTitle] = useState(title);
  const handleDropdownChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedImageTitle(selectedTitle);
    const selectedCard = cardData.find((card) => card.title === selectedTitle);
    dispatch(selectCard(selectedCard));
  };
  useEffect(() => {
    setSelectedImageTitle(title);
  }, [title]);
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
        <select value={selectedImageTitle} onChange={handleDropdownChange}>
          {cardData.map((card) => (
            <option key={card.index} value={card.title}>
              {card.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
