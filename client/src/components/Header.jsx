import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userState } from "../../redux/user/userSlice.js";

export default function Header() {
  const { currentUser } = useSelector(userState);
  return (
    <div className="bg-red-700 py-2">
      <div className="flex justify-between items-center max-w-6xl p-4">
        <Link to="/">
          <h1
            id="home"
            className="text-4xl font-bold text-lime-800 text-outline-white px-2"
          >
            Send Your Christmas Card
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li
              id="home"
              className="text-lg text-white hover:text-yellow-100 px-2"
            >
              Home
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="avatar"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li
                id="home"
                className="text-lg text-white hover:text-yellow-100 px-2"
              >
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
