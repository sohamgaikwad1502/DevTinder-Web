import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
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
      <h3 className="text-3xl text-center text-white">No New Users Found</h3>
    );
  }

  return (
    feed &&
    feed.length > 0 && (
      <div className="flex justify-center items-center my-10">
        <UserCard user={feed[0]}></UserCard>
      </div>
    )
  );
};

export default Feed;
