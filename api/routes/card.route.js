import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { sendCard, getCardById } from "../controllers/card.controllers.js";

const router = express.Router();
router.get("/sent-card/:cardId", getCardById);
router.post("/send-card", verifyUser, sendCard);

export default router;
