import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Stamp from "../components/Stamp";

export default function History() {
  const location = useLocation();
  const allCards = location.state;
  console.log(allCards);
  const [history, setHistory] = useState({});
  const extractDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const formattedDate = dateObj.toISOString().split("T")[0];
    return formattedDate;
  };

  // useEffect(() => {
  //   const fetchCards = async () => {
  //     try {
  //       const response = await axios.get(`/api/card/history/${userId}`);
  //       const fetchedCardsData = response.data.cards;
  //       console.log(fetchedCardsData);
  //       setHistory(fetchedCardsData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchCards();
  // }, [userId]);

  return (
    <div>
      <h1 className="text-center text-3xl text-emerald-400 py-2 text-outline-black">
        Sent Items
      </h1>
      <div className="flex justify-center">
        <ul className="flex gap-4 transition-all">
          {allCards.map((card, index) => (
            <li key={index} className=" hover:scale-105 ">
              <img
                className="rounded-lg shadow-lg cursor-pointer w-60 h-40  overflow-hidden"
                key={index}
                src={card.url}
              />
              <div className="mt-2 rounded-xl  bg-emerald-200 text-center py-1">
                <p className="font-bold">To. {card.recipient}</p>
                <p id="home_banner">Date: {extractDate(card.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
