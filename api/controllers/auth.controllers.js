import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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
    if (!validUser) return next(errorHandler(404, "User not Found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // To avoid returning password to client server
    // store hashedPw to password and the rest of the info is stored in the 'rest'
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); //1hour last
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

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPw, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1hr last
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      //if the user does not exist, we need to create password for the user and save it in the db
      const generatedPw =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPw = bcryptjs.hashSync(generatedPw, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() + uuidv4().toString(),
        email: req.body.email,
        password: hashedPw,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      //create JWT with new user id
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      // inside newUser._doc, save password value in 'hashedPassword2',
      // and the rest properties are saved in 'rest' variable
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); //1hour last
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("access_token").status(200).json("Logout successfully");
};
