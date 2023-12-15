import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { deleteUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
