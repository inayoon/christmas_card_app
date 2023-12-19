import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCardState } from "../../redux/card/cardSlice.js";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SentCard() {
  const { cardId } = useParams();
  const [cardData, setCardData] = useState({});
  console.log(cardData);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const { avatar, letter, url, recipient } =
    useSelector(selectCardState).selectedCard || {};
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`/api/card/sent-card/${cardId}`);
        const fetchedCardData = response.data;
        setCardData(fetchedCardData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCard();
  }, [cardId]);

  const handleOpenClick = () => {
    setIsCardVisible(true);
    setTimeout(() => {
      setIsCardVisible(true);
    }, 500);
  };
  //console.log(useSelector(selectCardState));
  return (
    <div className="flex items-center justify-center pt-8 h-full">
      <div className="bg-red-700  w-1/2  p-8 rounded-2xl shadow-lg mb-8 h-full">
        <h1 className="text-2xl text-center mb-2 text-lime-900 text-outline-white">
          {`A letter has arrived for ${cardData.recipient}`}
        </h1>
        <div className="mx-auto flex flex-col justify-between max-w-sm bg-amber-400 border-2 border-neutral-800 border-solid shadow-md">
          <div className="flex">
            <div className="p-4" id="home_banner">
              🎄To.{" "}
            </div>
            <div
              className="mt-1 p-2 bg-transparent border-b-2 border-neutral-800
              w-32 h-12 text-sm text-white"
            >
              {recipient}
            </div>
          </div>
          <div className="flex justify-end mx-8 mt-32 pb-2">
            <div className="p-4" id="home_banner">
              From.
            </div>

            <img
              className="h-14 w-14  self-center rounded-full object-cover"
              src={avatar}
              alt="avatar"
            />
          </div>
        </div>
        <button
          id="home_banner"
          className="mt-4 p-2 mx-auto block bg-amber-100 rounded-full animate-bounce"
          onClick={handleOpenClick}
        >
          Open it!
        </button>
        {/* card div */}
        {isCardVisible && (
          <div className="max-w-xs mx-auto overflow-hidden ">
            <img src={url} />
            <div className="bg-lime-900 text-white rounded-md shadow-lg text-center p-4 mt-1">
              {letter}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
