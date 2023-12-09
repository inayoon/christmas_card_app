import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCard } from "../../redux/card/cardSlice.js";
import cardsData from "../data/card.json";

export default function Cards({ visibleCard }) {
  const visibleCards = cardsData.slice(0, visibleCard);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardSelect = (selectedCard) => {
    dispatch(selectCard(selectedCard)); // Dispatch the selectCard action
    navigate(`/card-detail/${selectedCard.index + 1}`);
  };
  const handleCardMouse = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {visibleCards.map((card, index) => (
          <div
            className={`relative mx-auto rounded-lg shadow-lg ${
              selectedIndex === index ? "brightness-75 opacity-100" : ""
            }`}
            key={index}
            onMouseEnter={() => handleCardMouse(index)}
            onMouseLeave={() => handleCardMouse(null)}
          >
            <img
              className="mx-auto rounded-lg shadow-lg"
              width="400px"
              key={index}
              src={card.url}
              alt={`Christmas Card ${index + 1}`}
            />
            {selectedIndex === index && (
              <div className="card-overlay">
                <p className="text-white text-lg font-bold mb-2">{`Christmas Card ${
                  index + 1
                }`}</p>
                <p className="text-white text-lg font-bold mb-2">
                  {card.title}
                </p>
                <button
                  className="px-6 py-2 text-white font-semibold bg-red-700 rounded-full cursor-pointer"
                  onClick={() => handleCardSelect({ ...card, index })}
                >
                  Select
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
