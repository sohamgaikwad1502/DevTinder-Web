import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
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
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, []);
  return (
    feed &&
    feed.data.length > 1 && (
      <div className="flex justify-center items-center my-10">
        <UserCard user={feed.data[1]}></UserCard>
      </div>
    )
  );
};

export default Feed;
