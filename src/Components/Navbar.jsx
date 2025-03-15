import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import { removeFeed } from "../../utils/feedSlice";
import { useState } from "react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      return navigate("/login");
    } catch (error) {
      //TODO
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="navbar bg-base-300 text-gray-200 px-2 sm:px-4 lg:px-6 flex-wrap">
      <div className="flex-1">
        <Link
          to="/feed"
          className="btn btn-ghost text-lg sm:text-xl p-1 sm:p-2"
        >
          Dev Tinder
        </Link>
      </div>

      {user && (
        <>
          {/* Mobile menu button */}
          <div className="flex sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost btn-circle"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="form-control text-sm md:text-base">
              Welcome {user.firstName}
            </div>
            <div className="dropdown dropdown-end mx-2 md:mx-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 md:w-10 rounded-full">
                  <img
                    alt={`${user.firstName}'s profile picture`}
                    src={user.photoUrl}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-48 md:w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between py-2">
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="justify-between py-2">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="justify-between py-2">
                    Requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="py-2 text-left w-full"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Mobile menu (collapsible) */}
      {user && mobileMenuOpen && (
        <div className="sm:hidden w-full mt-2 pb-2 border-t border-gray-700">
          <div className="flex items-center gap-2 py-2">
            <div className="w-8 rounded-full overflow-hidden ml-1">
              <img
                alt={`${user.firstName}'s profile picture`}
                src={user.photoUrl}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/40";
                }}
              />
            </div>
            <div className="text-sm">Welcome {user.firstName}</div>
          </div>
          <ul className="menu menu-sm w-full">
            <li>
              <Link
                to="/profile"
                className="py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                to="/connections"
                className="py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connections
              </Link>
            </li>
            <li>
              <Link
                to="/requests"
                className="py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Requests
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="py-2 text-left w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
