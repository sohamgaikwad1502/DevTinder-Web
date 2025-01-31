import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestSlice";
import { useNavigate } from "react-router";

const Request = () => {
  const requestedData = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(requests);
      dispatch(addRequest(requests.data.requestByUser));
    } catch (error) {
      console.log(error);
    }
  };

  const requestHandler = async (status, id) => {
    try {
      const saveStatus = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(saveStatus);
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requestedData || requestedData.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 h-screen">
        <h2 className="text-4xl font-bold text-gray-200 mb-6 animate-bounce">
          No Requests Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg text-lg">
          It looks like you don't have any active requests at the moment. Please
          go to the feed to make friends !
        </p>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105"
          onClick={() => {
            navigate("/feed");
          }}
        >
          Go to Feed
        </button>
      </main>
    );
  }

  return (
    <div className="text-center my-10">
      <h3 className="text-bold text-3xl text-white">Connection Requests</h3>

      {requestedData.map((connection) => {
        const { firstName, lastName, photoUrl, about, skills, _id } =
          connection.fromConnectionId;

        return (
          <div
            key={_id}
            className="m-4 p-4 flex justify-between items-center bg-base-300 w-2/3 mx-auto"
          >
            <div className="">
              <img src={photoUrl} className="w-20 h-20 rounded-full" alt="" />
            </div>
            <div className="ml-5 text-left">
              <h2 className="font-bold  text-xl">
                {firstName + " " + lastName}{" "}
              </h2>
              <p>{about}</p>
              <p>{skills.join(", ")}</p>
            </div>
            <div className="">
              <button
                className="btn btn-primary text-white mx-2"
                onClick={() => requestHandler("rejected", connection._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary text-white mx-2"
                onClick={() => requestHandler("accepted", connection._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
