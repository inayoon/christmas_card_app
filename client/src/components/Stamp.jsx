import React from "react";

export default function Stamp({ history }) {
  console.log(history);
  return (
    <div className="flex justify-center gap-4">
      {history.map((card, index) => (
        <div>
          <img
            className="inline w-72 h-40 mx-auto mb-2 rounded-md shadow-lg"
            src={card.url}
          />
        </div>
      ))}
    </div>
  );
}
