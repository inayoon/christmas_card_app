import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCardState,
  updateEnvelope,
  resetCard,
} from "../../redux/card/cardSlice.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default function Envelope() {
  const { recipient, avatar } = useSelector(selectCardState).selectedCard || {};
  const { title, url, letter } = useSelector(selectCardState).selectedCard;
  const [cardId, setCardId] = useState("");
  const [sentCardURL, setsentCardURL] = useState("");
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cardData = {
        recipient: recipient,
        letter: letter,
        url: url,
        title: title,
        avatar: avatar,
      };

      const formData = new FormData();
      formData.append("cardData", JSON.stringify(cardData));
      await handleFileUpload(image);

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
  const handleChange = (e) => {
    dispatch(updateEnvelope({ recipient: e.target.value }));
  };
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
  const handleReset = () => {
    dispatch(resetCard());
  };
  const copyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };
  return (
    <div className="flex items-center justify-center pt-8 h-full">
      <div className="bg-red-700  w-1/3  p-8 rounded-2xl shadow-lg mb-8 h-full">
        <h1 className="text-2xl text-center mb-2 text-lime-900 text-outline-white">
          Add your picture beside From
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto flex flex-col justify-between max-w-sm bg-amber-400 border-2 border-neutral-800 border-solid shadow-md">
            <div className="flex">
              <div className="p-4" id="home_banner">
                🎄To.{" "}
              </div>
              <input
                className="mt-1 p-2 bg-transparent border-b-2 border-neutral-800 w-32 h-12 text-sm placeholder-white"
                type="text"
                id="recipient"
                value={recipient}
                placeholder="Recipient's name"
                onChange={handleChange}
              />
            </div>
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

            <p className="text-sm self-center">
              {imageError ? (
                <span className="text-white">
                  Error Uploading image (file size must be less than 4MB){" "}
                </span>
              ) : imagePercent > 0 && imagePercent < 100 ? (
                <span className="text-green-800">{`Uploading:${imagePercent} %`}</span>
              ) : imagePercent === 100 ? (
                <span className="text-green-800">
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>
          </div>

          <button
            type="submit"
            id="home"
            className="text-lg text-outline-white mx-auto block max-w-xs px-8 py-2 mt-6 bg-green-800 rounded-md relative group hover:text-outline-yellow"
          >
            Send now
            <span className="absolute transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-xl">
              🎄
            </span>
          </button>
        </form>
      </div>
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          <div className="relative bg-white p-8 max-w-md rounded-md">
            <p className="text-lg font-semibold mb-4 text-center">
              💌💨
              <br />
              The letter has been written!
              <br /> Please share it now!
            </p>

            <div className="flex items-center mb-4">
              <span className="mr-2 overflow-hidden overflow-ellipsis max-w-xs">
                {sentCardURL}
              </span>

              {/* 복사 버튼 */}
              <button
                onClick={() => copyToClipboard(sentCardURL)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Copy URL
              </button>
            </div>
            <Link to="/">
              <button
                onClick={handleReset}
                className="bg-red-700 text-white px-4 py-2 rounded-md mx-auto block"
              >
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
