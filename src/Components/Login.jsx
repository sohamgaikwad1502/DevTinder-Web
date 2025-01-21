import axios from "axios";
import { useState } from "react";
import { addUser } from "../../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";

const Login = function () {
  const [emailId, setEmailId] = useState("alice.johnson@example.com");
  const [password, setPassword] = useState("Alice@101");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState("");
  const [userNotLoggedIn, setUserNotLoggedIn] = useState(true);

  const isNotLoggedIn = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      if (user) {
        setUserNotLoggedIn(false);
        return navigate("/feed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  isNotLoggedIn();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      seterrorMessage(err?.statusText || "Something Went Wrong!!");
      console.log("ERROR:" + err);
    }
  };

  return (
    <div className="flex justify-center m-20">
      {userNotLoggedIn && (
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Login</h2>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <div className="label"></div>
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="label"></div>
              </label>
            </div>
            <span className="text-red-600 ml-2">{errorMessage}</span>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
