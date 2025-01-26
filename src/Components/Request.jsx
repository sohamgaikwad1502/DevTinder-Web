import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../../utils/requestSlice";

const Request = () => {
  const requestedData = useSelector((store) => store.requests);
  const dispatch = useDispatch();
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

  if (!requestedData || requestedData.length === 0)
    return <h3 className="text-3xl text-white">No RequestsFound</h3>;

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
