import { errorHandler } from "../utils/error.js";
import Card from "../models/card.model.js";
import User from "../models/user.model.js";

export const sendCard = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      // req.user가 정의되어 있지 않거나 _id 속성이 없는 경우
      return next(errorHandler(401, "User not authenticated"));
    }
    // const { title, url, letter, recipient, avatar } = req.body;
    const { title, url, letter, recipient } = JSON.parse(req.body.cardData); // JSON 문자열을 파싱
    const newCard = new Card({
      title,
      url,
      letter,
      recipient,
      // avatar,
      sender: userId,
    });
    await newCard.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { cards: newCard._id } }, // $push를 사용하여 cards 배열에 새로운 카드 ID 추가
      { new: true }
    );

    res.status(201).json({ message: "Card successfully saved" });
  } catch (error) {
    next(error);
  }
};
