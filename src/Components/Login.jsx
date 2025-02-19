import axios from "axios";
import { useState } from "react";
import { addUser } from "../../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";

const Login = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const [isSignup, setisSignup] = useState(false);

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.user));
      return navigate("/profile");
    } catch (error) {
      seterrorMessage(error?.response?.data || "Something Went Wrong!!");
      setInterval(() => {
        seterrorMessage("");
      }, 4000);
      console.log(error);
    }
  };

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
      console.log(err.response?.data);
      console.log(err);
      seterrorMessage(
        err.message || err.response?.data || "Something Went Wrong!!"
      );
      setInterval(() => {
        seterrorMessage("");
      }, 5000);
      console.log("ERROR:" + err);
    }
  };

  return (
    <div className="flex justify-center m-20">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isSignup ? "Sign Up" : "Login"}
          </h2>
          <div>
            <label className="form-control w-full max-w-xs">
              {isSignup && (
                <>
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}

              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="Email Id"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <div className="label"></div>
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
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
          <p className="text-red-600 ml-2">{errorMessage}</p>

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                isSignup ? handleSignup() : handleLogin();
              }}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </div>
          <p
            className="text-white cursor-pointer m-auto py-2"
            onClick={() => {
              setisSignup(!isSignup);
            }}
          >
            {isSignup ? "Existing User ? Login here" : "New user ? Signup here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
