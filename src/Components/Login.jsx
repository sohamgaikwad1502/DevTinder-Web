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
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      return navigate("/profile");
    } catch (error) {
      setErrorMessage(error?.response?.data || "Something Went Wrong!!");
      setTimeout(() => {
        setErrorMessage("");
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

      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      console.log(err.response?.data);
      console.log(err);
      setErrorMessage(
        err.message || err.response?.data || "Something Went Wrong!!"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      console.log("ERROR:" + err);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-8 md:py-16 lg:py-20">
      <div className="card bg-base-300 w-full max-w-md shadow-xl">
        <div className="card-body p-4 md:p-6">
          <h2 className="card-title justify-center text-xl md:text-2xl mb-4">
            {isSignup ? "Sign Up" : "Login"}
          </h2>
          <div className="w-full">
            <label className="form-control w-full">
              {isSignup && (
                <>
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}

              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <div className="label pt-2">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => {
                isSignup ? handleSignup() : handleLogin();
              }}
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </div>

          <p
            className="text-center cursor-pointer mt-4 text-sm md:text-base"
            onClick={() => {
              setIsSignup(!isSignup);
            }}
          >
            {isSignup ? "Existing User? Login here" : "New user? Signup here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
