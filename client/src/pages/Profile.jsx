import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";

import {
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOut,
} from "../../redux/user/userSlice.js";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignout = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4 mx-auto max-w-lg">
      <h1 className="text-4xl text-center my-4 text-teal-600">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          src={currentUser.profilePicture}
          alt="avatar"
        />
        <input
          className="bg-emerald-600  p-4 rounded-lg text-white placeholder-white shadow-md"
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
        />
        <input
          className="bg-emerald-700  p-4 rounded-lg text-white placeholder-white shadow-md"
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
        />
      </form>
      <div className="flex justify-between mt-2">
        <span
          onClick={handleDeleteAccount}
          className="text-red-600 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-600 cursor-pointer">
          Log out
        </span>
      </div>

      {/* <p className="text-red-600">{error && "Something went wrong"}</p>
      <p className="text-green-700">
        {updateSuccess && "User is updated Successfully"}
      </p> */}
    </div>
  );
}
