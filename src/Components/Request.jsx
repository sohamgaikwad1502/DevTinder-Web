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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Connection Requests
      </h3>

      <div className="space-y-6">
        {requestedData.map((connection) => {
          const { firstName, lastName, photoUrl, about, skills, _id } =
            connection.fromConnectionId;

          return (
            <div
              key={_id}
              className="group flex items-center gap-8 bg-base-300 p-6 rounded-lg hover:bg-base-200 transition-all duration-300 w-3/4 mx-auto"
            >
              <div className="flex-shrink-0">
                <img
                  src={photoUrl}
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300"
                  alt=""
                />
              </div>

              <div className="flex-grow grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-base text-base-content/70 line-clamp-2 group-hover:line-clamp-none">
                    {about}
                  </p>
                  <p className="text-sm text-base-content/60">
                    {skills.join(", ")}
                  </p>
                </div>
                <div className="flex items-center justify-end space-x-4">
                  <button
                    className="btn btn-error px-6"
                    onClick={() => requestHandler("rejected", connection._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-success px-6"
                    onClick={() => requestHandler("accepted", connection._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
