import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default function Envelope() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = uuidv4() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      }
      // ()=>{getDownloadURL(uploadTask.snapshot.ref).then(downloadURL)}
    );
  };
  return (
    <div className="flex items-center justify-center pt-8 h-full">
      <div className="bg-red-700  w-1/2  p-8 rounded-2xl shadow-lg mb-8 h-full">
        <div className="mx-auto flex flex-col justify-between max-w-md h-60 bg-amber-400 border-2 border-neutral-800 border-solid shadow-md">
          <div className="flex">
            <div className="p-4" id="home_banner">
              To.{" "}
            </div>
            <input
              className="mt-1 p-2 bg-transparent border-b-2 border-neutral-800 w-32 h-12 text-sm placeholder-white"
              type="text"
              placeholder="Recipient's name"
            />
          </div>
          <div className="flex justify-end mb-4 mx-2">
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
              src={currentUser.profilePicture}
              alt="avatar"
              onClick={() => fileRef.current.click()}
            />
          </div>
        </div>
        <p className="text-right">
          {imageError ? (
            <span>Error uploading image(file size)</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image Upload Successfully</span>
          ) : (
            ""
          )}
        </p>
      </div>
    </div>
  );
}
