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
  const [toastMessage, setToastMessage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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
      dispatch(addUser(res?.data));
      setToastMessage(true);
      setTimeout(() => setToastMessage(false), 4000);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error?.message || "Something went wrong");
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <>
      {toastMessage && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="md:hidden flex justify-center mb-4">
          <button className="btn btn-sm btn-outline" onClick={togglePreview}>
            {showPreview ? "Edit Profile" : "Preview Profile"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <div
            className={`w-full md:w-1/2 ${
              showPreview ? "hidden md:block" : "block"
            }`}
          >
            <div className="card bg-base-300 shadow-xl max-w-md mx-auto">
              <div className="card-body">
                <h2 className="card-title flex justify-center text-xl mb-4">
                  Edit Profile
                </h2>
                <div className="space-y-2">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">First Name:</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input input-bordered w-full"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Photo URL:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Photo URL"
                      className="input input-bordered w-full"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Gender:</span>
                    </div>
                    <select
                      className="select select-bordered w-full"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">About:</span>
                    </div>
                    <textarea
                      placeholder="Tell us about yourself"
                      className="textarea textarea-bordered w-full h-24"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Age:</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Age"
                      min="18"
                      max="120"
                      className="input input-bordered w-full"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>

                {error && <div className="text-red-600 mt-4">{error}</div>}

                <div className="card-actions justify-center mt-6">
                  <button
                    className="btn btn-primary w-full sm:w-auto"
                    onClick={updateProfile}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User Card Preview - Hidden on mobile when edit form is shown */}
          <div
            className={`w-full md:w-1/2 ${
              !showPreview ? "hidden md:block" : "block"
            }`}
          >
            <div className="flex justify-center">
              <UserCard
                user={{ firstName, lastName, gender, photoUrl, about, age }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
