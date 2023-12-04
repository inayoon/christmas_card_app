import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPw = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPw });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    next(error);
  }
};
export const signin = (req, res, next) => {};

export const google = (req, res, next) => {};
