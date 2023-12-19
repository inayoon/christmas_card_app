import { errorHandler } from "../utils/error.js";
import Card from "../models/card.model.js";
import User from "../models/user.model.js";

export const getCardById = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    console.log(`Fetching card with ID: ${cardId}`);

    const card = await Card.findById(cardId);

    if (!card) {
      console.log("Card not found");
      return next(errorHandler(404, "Card not found"));
    }
    console.log("Card found:", card);
    res.status(200).json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    next(error);
  }
};

export const sendCard = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      // req.user가 정의되어 있지 않거나 _id 속성이 없는 경우
      return next(errorHandler(401, "User not authenticated"));
    }
    const { title, url, letter, recipient, avatar } = JSON.parse(
      req.body.cardData
    );

    const newCard = new Card({
      title,
      url,
      letter,
      recipient,
      avatar,
      sender: userId,
    });
    await newCard.save();
    res
      .status(201)
      .json({ message: "Card successfully saved", cardId: newCard._id });

    await User.findByIdAndUpdate(
      userId,
      { $push: { cards: newCard._id } },
      { new: true }
    );

    res.status(201).json({ message: "Card successfully saved" });
  } catch (error) {
    next(error);
  }
};
