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

Used firebase GoogleAuth function.<br/>
But, Sign-up and sign-in are possible without a Google account.

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
<summary><h3>CardsDropdown Code</h3></summary>
<br/>

When a card is changed through the dropdown menu, the code retrieves the changed name value. <br/>
It then searches for the corresponding card in the JSON data containing all cards. The matched card information is stored in the `cardSlice`.

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

> ### 3. Preview Feature for Attached Images
![avatarUpload](https://github.com/inayoon/christmas_card_app/assets/100747899/5ab137d8-110d-4bba-9013-aeb7eff3a644)


<details>
<summary><h3>Code for Previewing Attached Avatars</h3></summary>
<br/>

When a successful image upload occurs using Firebase Storage, the image is assigned a URL. <br/>
Subsequently, the `updateEnvelope` reducer is invoked via the dispatch function, storing the name and avatar URL of the recipient in the `cardSlice`.

```Javascript
    const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = uuidv4() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    const currentRecipient = recipient;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        dispatch(
          updateEnvelope({ recipient: currentRecipient, avatar: downloadURL })
        );
      }
    );
  };

 return(
    <div className="flex justify-end mx-8 mt-32 pb-2">
     <div className="p-4" id="home_banner">
      From.
     </div>
     <input
      type="file"
      ref={fileRef}
      hidden
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
      />
      <img
        className="h-14 w-14  self-center cursor-pointer rounded-full object-cover"
        src={avatar || currentUser.profilePicture}
        alt="avatar"
        onClick={() => fileRef.current.click()}
        />
     </div>
 ... 
)
```

</details>

---

<br/>

> ### 4. URL Sharing Feature
![sentCard](https://github.com/inayoon/christmas_card_app/assets/100747899/4e850b23-12f6-4f9a-b96d-8beff953fef2)


<details>
<summary><h3>Code for Sharing Cards</h3></summary>
<br/>

When users click the send button, all card details are stored in the database. <br/>
A unique URL, including the card ID, can be effortlessly copied using the copy button, allowing easy sharing with recipients.

```Javascript
 <!-- Code for Establishing Server Communication through POST request -->
    const response = await axios.post("/api/card/send-card", formData, {
        // withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (data.success === false) {
        console.log("Card sent failed");
      } else {
        const newCardId = data.cardId;
        setCardId(newCardId);
        const cardURL = `https://christmas-card-app.onrender.com/sent-card/${newCardId}`;
        setsentCardURL(cardURL);
        console.log("Card sent successfully");
      }
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error sending the card", error);
    }
  };

 <!-- Code for Copying the URL of the Sent Card  -->
 const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

 return (
 <!-- Where the copyToClipboard Function is Invoked  -->
   <button
    onClick={() => copyToClipboard(sentCardURL)}
    className="bg-blue-500 text-white px-4 py-2 rounded-md"
   >
    Copy URL
   </button>
)
    
```

</details>

---

<br/>

> ### 5. Quantity of Sent Items and History Feature
![history](https://github.com/inayoon/christmas_card_app/assets/100747899/dab7d638-d457-4207-aedb-ad93758b43d1)


<details>
<summary><h3>Code for Sent Cards History</h3></summary>
<br/>

When the Home component renders, it makes a GET request to fetch all cards from the database with the corresponding userId.<br/>
And when clicking the number of cards at `Home` page, it passes the `allCards` state to the `History` page.

```Javascript
Home.jsx
 <!-- Code for Server Communication through GET request to get AllCards Info-->
const getNumberOfCards = async () => {
    if (currentUser._id) {
      const response = await axios.get(
        `/api/card/getAllCard/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      setAllCards(data);
    }
  };
  useEffect(() => {
    getNumberOfCards();
  }, []);

 <!-- Code for Sending the AllCards state to History Component -->
const handleClick = () => {
    if (currentUser) {
      navigate(`/history/${currentUser._id}`, { state: allCards });
    } else {
      navigate("/");
    }

```

```Javascript
History.jsx
import { useLocation } from "react-router-dom";

export default function History() {
  const location = useLocation();
  const allCards = location.state;
  const extractDate = (createdAt) => {
    const dateObj = new Date(createdAt);
    const formattedDate = dateObj.toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-center text-3xl text-emerald-400 py-2 text-outline-black mb-4 md:mb-8">
        Sent Items
      </h1>
      <div className="flex justify-center">
        <ul className="flex justify-center gap-4 transition-all flex-wrap ">
          {allCards.map((card, index) => (
            <li key={index} className=" hover:scale-105 ">
              <img
                className="rounded-lg shadow-lg cursor-pointer w-60 h-40  overflow-hidden"
                key={index}
                src={card.url}
              />
              <div className="mt-2 rounded-xl  bg-green-800 text-center py-1 shadow-lg mb-1">
                <p className="font-bold text-white">To. {card.recipient}</p>
                <p className="text-white" id="home_banner">
                  Date: {extractDate(card.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

```

</details>

---

<br/>

> ### Used Fonts
  - [Rubik Bubbles](https://fonts.google.com/specimen/Rubik+Bubbles?query=Rubik+Bubble)
  - [Nunito](https://fonts.google.com/specimen/Nunito?query=nunito)
  - [Belmist](https://www.cdnfonts.com/belmist.font)

<br/>

> ### Used Cards Image
  - (https://img.freepik.com/free-vector/festive-christmas-clipart-elements-collection_53876-95704.jpg)
  - (https://img.freepik.com/free-vector/festive-christmas-clipart-elements-collection_53876-95704.jpg)
  - (https://img.freepik.com/free-photo/top-view-festive-christmas-ornaments-with-copy-space_23-2149136143.jpg)
  - (https://img.freepik.com/free-vector/hand-drawn-christmas-background_23-2148672963.jpg)
  - (https://img.freepik.com/free-vector/cream-winter-background-christmas-aesthetic-design-vector_53876-151492.jpg)
  - (https://img.freepik.com/free-vector/flat-christmas-background_23-2149164725.jpg)
  - (https://www.freepik.com/free-psd/merry-christmas-realistic-background_84924382.htm#query=christmas&position=4&from_view=search&track=sph&uuid=248850e9-6555-405c-bc60-3a7752a6b132#position=4&query=christmas)
  - (https://www.freepik.com/free-photo/glittery-christmas-snowflakes-festive-background_35261314.htm#page=3&query=christmas&position=40&from_view=search&track=sph&uuid=1a5b3224-671c-4ef8-9b49-80305e0997d3)
  - (https://www.freepik.com/free-vector/christmas-background-with-glitter-effect_6390227.htm#page=8&query=christmas&position=13&from_view=search&track=sph&uuid=1a5b3224-671c-4ef8-9b49-80305e0997d3)
