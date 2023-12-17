import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectCardState, updateEnvelope } from "../../redux/card/cardSlice.js";
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
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(useSelector(selectCardState));
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
      };

      const formData = new FormData();
      formData.append("cardData", JSON.stringify(cardData));

      const response = await axios.post("/api/card/send-card", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (data.success === false) {
        console.log("Card sent failed");
      } else {
        console.log("Card sent successfully");
      }
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
  return (
    <div className="flex items-center justify-center pt-8 h-full">
      <div className="bg-red-700  w-1/2  p-8 rounded-2xl shadow-lg mb-8 h-full">
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
    </div>
  );
}
