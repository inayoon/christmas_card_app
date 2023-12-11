import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      //firebase앱의 인증 객체를 가져옴
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await axios.post(
        "http://localhost:3000/api/auth/google",
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );
      dispatch(signInSuccess(response.data));
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
