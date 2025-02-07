import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import { addUser } from "../../utils/userSlice";

const Body = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("view api in body executed !! ");
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 pb-12">
        <div className="container mx-auto space-y-6">
          <Outlet />
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Body;
