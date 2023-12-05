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
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPw = bcryptjs.compareSync(password, validUser.password);
    if (!validPw) return next(errorHandler(401, "Wrong password"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // To avoid returning password to client server
    // store hashedPw to password and the rest of the info is stored in the 'rest'
    const { password: hashedPw, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1hr last
    //store token value inside the cookie(which is access_token)
    //and when user is logged in successfully, show the rest of the info
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = (req, res, next) => {};
