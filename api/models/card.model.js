import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    letter: String,
    recipient: String,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
