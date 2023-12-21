import { useLocation } from "react-router-dom";

export default function History() {
  const location = useLocation();
  const allCards = location.state;
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
        <ul className="flex justify-center gap-4 transition-all flex-wrap ">
          {allCards.map((card, index) => (
            <li key={index} className=" hover:scale-105 ">
              <img
                className="rounded-lg shadow-lg cursor-pointer w-60 h-40  overflow-hidden"
                key={index}
                src={card.url}
              />
              <div className="mt-2 rounded-xl  bg-green-800 text-center py-1 shadow-lg mb-1">
                <p className="font-bold text-white">To. {card.recipient}</p>
                <p className="text-white" id="home_banner">
                  Date: {extractDate(card.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
