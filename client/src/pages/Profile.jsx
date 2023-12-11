import { useSelector } from "react-redux";
import { app } from "../firebase";
import { v4 as uuidv4 } from "uuid";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
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
        <input
          className="bg-emerald-600  p-4 rounded-lg text-white placeholder-white shadow-md"
          type="password"
          id="password"
          placeholder="Password"
        />
        <button className="bg-red-700 text-white p-3 rounded-lg hover:text-yellow-300 hover:font-bold disabled:opacity-60 relative group">
          Update
          <span className="absolute right-60 top-0 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-xl">
            🎄
          </span>
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <span
          // onClick={handleDeleteAccount}
          className="text-red-600 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          // onClick={handleSignout}
          className="text-red-600 cursor-pointer"
        >
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
