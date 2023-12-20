import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState } from "../../redux/user/userSlice";
import Card from "../components/Card";

export default function Home() {
  const navigate = useNavigate();
  const { sentCard } = useSelector(userState);
  const [visibleCard, setVisibleCard] = useState(3);
  const [selectedCard, setSelectedCard] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const handleLoadMore = () => {
    setVisibleCard((prev) => prev + 3);
  };
  const handleCardSelect = (index) => {
    setSelectedCard(index);
  };
  const handleClick = () => {
    navigate(`/history/${currentUser._id}`);
  };
  return (
    <div>
      <p
        className="text-center py-4 text-lime-700 font-semibold text-lg"
        id="home_banner"
      >
        Merry Christmas!🎄
        <br />
        Express Your Heartfelt Wishes With a Christmas Card
      </p>
      <img
        className="max-w-md mx-auto rounded-xl shadow-md"
        src="https://img.freepik.com/free-vector/gradient-christmas-tinsel-background_52683-76117.jpg?w=900&t=st=1701820769~exp=1701821369~hmac=c2ff811c7178881cfd46906aff692bc522c46c69fae6be2762145fe033c79941"
      />
      <div
        className="text-center pt-1 text-sm text-lime-700 font-bold"
        id="home_banner"
      >
        Sent{" "}
        <span
          onClick={handleClick}
          className="text-red-700 underline decoration-dashed decoration-red-700 font-bold text-lg cursor-pointer"
        >
          {sentCard}
        </span>{" "}
        cards so far!
      </div>
      <div className="mt-8 text-center">
        <p
          className="mr-40 text-2xl text-amber-200 text-outline-black"
          id="home"
        >
          Christmas Cards💌
        </p>
        <button
          className="ml-80 text-md text-pink-700 hover:scale-110"
          onClick={handleLoadMore}
          id="home"
        >
          ▶More
        </button>
        <Card visibleCard={visibleCard} onCardSelect={handleCardSelect} />
      </div>
    </div>
  );
}
