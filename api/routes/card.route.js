import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { sendCard } from "../controllers/card.controllers.js";

const router = express.Router();
router.post("/send-card", verifyUser, sendCard);

export default router;
