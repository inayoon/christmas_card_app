import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  sendCard,
  getCardById,
  getCardsById,
} from "../controllers/card.controllers.js";

const router = express.Router();
router.get("/sent-card/:cardId", getCardById);
router.get("/history/:userId", getCardsById);
router.post("/send-card", verifyUser, sendCard);

export default router;
