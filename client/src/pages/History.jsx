import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Stamp from "../components/Stamp";

export default function History() {
  const location = useLocation();
  const allCards = location.state;
  console.log(allCards);
  const [history, setHistory] = useState({});

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
            <li key={index} className=" hover:scale-105 overflow-hidden ">
              <img
                className="rounded-lg shadow-md cursor-pointer w-60 h-40"
                key={index}
                src={card.url}
              />
            </li>
          ))}
        </ul>
      </div>
      {/* <Stamp history={history} /> */}
    </div>
  );
}
