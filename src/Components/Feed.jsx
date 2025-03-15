import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);

  if (feed && feed.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 min-h-screen py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-4 md:mb-6 animate-bounce">
          No New Users Found
        </h2>
        <p className="text-gray-400 mb-4 sm:mb-6 md:mb-8 max-w-lg text-base md:text-lg px-4">
          It looks like there are no new users to show on feed. See if there are
          any pending requests!
        </p>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg text-base md:text-lg transition-transform transform hover:scale-105"
          onClick={() => {
            navigate("/requests");
          }}
        >
          Go to Requests
        </button>
      </main>
    );
  }

  return (
    feed &&
    feed.length > 0 && (
      <div className="flex justify-center items-center px-4 py-6 sm:py-8 md:py-10">
        <UserCard user={feed[0]}></UserCard>
      </div>
    )
  );
};

export default Feed;
