import React, { useState } from "react";
import cardsData from "../data/card.json";

export default function Cards({ visibleCard, onCardSelect }) {
  const visibleCards = cardsData.slice(0, visibleCard);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (index) => {
    setSelectedCard(index);
    onCardSelect(index);
  };
  return (
    <div>
      <div className="flex flex-col gap-2 ">
        {visibleCards.map((card, index) => (
          <div
            className={`relative mx-auto rounded-lg shadow-lg ${
              selectedCard === index ? "brightness-75 opacity-100" : ""
            }`}
            key={index}
            onMouseEnter={() => handleCardClick(index)}
            onMouseLeave={() => handleCardClick(null)}
          >
            <img
              className="mx-auto rounded-lg shadow-lg"
              width="400px"
              key={index}
              src={card.url}
              alt={`Christmas Card ${index + 1}`}
            />
            {selectedCard === index && (
              <div className="card-overlay">
                <p className="text-white text-lg font-bold mb-2">{`Christmas Card ${
                  index + 1
                }`}</p>
                <p className="text-white text-lg font-bold mb-2">
                  {card.title}
                </p>
                <button
                  className="px-6 py-2 text-white font-semibold bg-red-700 rounded-full cursor-pointer"
                  onClick={() => onCardSelect(index)}
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
