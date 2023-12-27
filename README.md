# Christmas_Card_App
 > I've created a service where users can choose a card, write a letter, and share it via a unique URL. This platform provides a personalized and shareable way to convey messages through selected cards.<br/>
> https://christmas-card-app.onrender.com/
<br/>

## Total Development Period
> 2023.12.04 ~ 2023.12.24
<br/>

## Tech Stack
### Frontend
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">

### Backend
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white">  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">

### Database
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">

<br/>

## 💌 Main Screens and Features
|                                                           1.  Home                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------: |
| ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/3a927b3d-188f-4986-b916-4e85c5a0cf1b) |

|                                                           **2. Sent Items**                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------: |
|  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/f0ba484e-5752-4b49-9cf2-68dd00d2117b) |

|                                                             **3.  Sign-Up**                                                                |                                                         **4. Sign-In**                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/ba026ef8-c34e-43e7-9031-0eae6aa60ae5)  |  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/1f59d485-acde-4f44-a1d8-cf497b25a2a2)  |

|                                                             **5.  Write a letter**                                                                |                                                         **6. Add an Avatar**                                                             |                                                         **7. Share the URL**                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/c00dc6c8-36eb-4b69-9337-7e6930d9d8a7)  |  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/41f01d79-ebc3-44f1-8824-8750ae1333f5)  |  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/e44d0608-2f18-4a06-b11b-8d9625969198)  |

|                                                             **8.  Received Card**                                                                |                                                         **9. Display Contents**                                                             |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/d2dce9dc-ab19-4a6b-b311-efafdda46885)   |  ![image](https://github.com/inayoon/christmas_card_app/assets/100747899/96f73c2b-13ba-4ffd-988f-688cdb9e392a)  |

<br/>

---

> ### 1. Sign-Up & Sign-In (With Google)

|                                                           Sign-Up with Google                                                              |
| :--------------------------------------------------------------------------------------------------------------------------------------: |
| ![singUp(google)](https://github.com/inayoon/christmas_card_app/assets/100747899/7888c801-a882-4743-9557-3b4051ba259c)  |

|                                                        **Sign-In with Google**                                                             |
| :---------------------------------------------------------------------------------------------------------------------------------: |
|  ![signIn(google)](https://github.com/inayoon/christmas_card_app/assets/100747899/060f9b0a-973f-48a5-8a24-c9bc6ff12093)  |

<details>
<summary><h3>Authentication Code (Continue with Google)</h3></summary>
<br/>

Used firebase GoogleAuth function 

```Javascript
<!-- OAuth.jsx -->
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Couldn't connect to Google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-green-700 rounded-lg p-2 text-white hover:text-yellow-300 hover:font-bold relative group"
    >
      Continue with Google
      <span className="absolute right-60 top-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-xl">
        🎄
      </span>
    </button>
  );
}

```
```Javascript
<!-- auth.contorllers.js -->
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
    if (!validUser) {
      return next(errorHandler(404, "User not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // To avoid returning password to client server
    // store hashedPw to password and the rest of the info is stored in the 'rest'
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3 * 3600000); //1hour last
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
      const expiryDate = new Date(Date.now() + 3 * 3600000); //1hr last
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
      const expiryDate = new Date(Date.now() + 3 * 3600000); //1hour last
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

```
</details>

---

<br/>

> ### 2. Loading Cards and Card Dropdown

![Load_DropdownCards](https://github.com/inayoon/christmas_card_app/assets/100747899/933a857e-f592-4c59-bac6-9db7eeb2ec0e)
<details>
<summary><h3>Loading Cards and CardsDropdown Code</h3></summary>
<br/>

When a card is changed through the dropdown menu, the code retrieves the changed name value. <br/>
It then searches for the corresponding card in the JSON data containing all cards. The matched card information is stored in the cardSlice

```Javascript
<!-- CardPicked.jsx -->
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCardState,
  selectCard,
  saveLetter,
} from "../../redux/card/cardSlice.js";
import cardData from "../data/card.json";

export default function CardPicked() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, url, letter } =
    useSelector(selectCardState).selectedCard || {};
  const [selectedImageTitle, setSelectedImageTitle] = useState(title);

   const handleDropdownChange = (e) => {
    const selectedTitle = e.target.value;
    setSelectedImageTitle(selectedTitle);
    const selectedCard = cardData.find((card) => card.title === selectedTitle);
    dispatch(selectCard(selectedCard));
  };
  useEffect(() => {
    setSelectedImageTitle(title);
  }, [title]);

...

 return(
  ...
 <div>
   <select
     className="mt-2 rounded-md text-sm bg-red-300 cursor-pointer "
     value={selectedImageTitle}
     onChange={handleDropdownChange}
    >
      {cardData.map((card, index) => (
        <option key={index} value={card.title}>
          {card.title}
         </option>
       ))}
     </select>
  )
}
```
</details>

---

<br/>

> ### 3. 암호 유효성 검사 기능
