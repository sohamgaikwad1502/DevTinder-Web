import React, { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  const [age, setAge] = useState(user.age || "");
  const [error, setError] = useState("");
  const [toastMessage, settoastMessage] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
          age,
          gender,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res?.data));
      settoastMessage(true);
      setTimeout(() => settoastMessage(false), 4000);
    } catch (err) {
      //TODO
      console.log(err);
      setError(err?.response?.data?.error?.message);
    }
  };

  return (
    <>
      {toastMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 h-auto shadow-xl ">
            <div className="card-body flex-col justify-between">
              <h2 className="card-title flex justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs ">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <div className="label">
                    <span className="label-text">Last Name :</span>
                  </div>
                  <input
                    type="text"
                    placeholder="last Name"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />

                  <div className="label">
                    <span className="label-text">photoUrl :</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Photo URL"
                    className="input input-bordered w-full max-w-xs"
                    value={photoUrl}
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                  />
                  <div className="label">
                    <span className="label-text">gender :</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Gender"
                    className="input input-bordered w-full max-w-xs"
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <div className="label">
                    <span className="label-text">About :</span>
                  </div>
                  <textarea
                    placeholder="about"
                    className="textarea textarea-bordered w-full max-w-xs"
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                  <div className="label">
                    <span className="label-text">age :</span>
                  </div>
                  <input
                    type="text"
                    placeholder="age"
                    className="input input-bordered w-full max-w-xs"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </label>
              </div>
              <span className="text-red-600 ml-2">{error}</span>
              <div className="card-actions justify-center m-3">
                <button className="btn btn-primary" onClick={updateProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, gender, photoUrl, about, age }}
        ></UserCard>
      </div>
    </>
  );
};

export default EditProfile;
