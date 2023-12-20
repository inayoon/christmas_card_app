import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Stamp from "../components/Stamp";

export default function History() {
  const { userId } = useParams();
  const [history, setHistory] = useState({});

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`/api/card/history/${userId}`);
        const fetchedCardsData = response.data.cards;
        setHistory(fetchedCardsData);
        console.log(history);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCards();
  }, [userId]);

  return (
    <div>
      <h1>! You sent cards!</h1>
      <Stamp history={history} />
    </div>
  );
}
