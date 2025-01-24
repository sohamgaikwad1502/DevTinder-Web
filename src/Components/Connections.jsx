import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import "@fontsource/roboto";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const connections = await axios.get(
        BASE_URL + "/user/request/getconnections",
        {
          withCredentials: true,
        }
      );

      console.log(connections.data.sortedData);
      dispatch(addConnections(connections.data.sortedData));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h3 className="text-bold text-2xl">No Connections Found</h3>;

  return (
    <div className="text-center my-10">
      <h3 className="text-bold text-3xl text-white">Connections</h3>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, about, skills, _id } =
          connection;

        return (
          <div key={_id} className="m-4 p-4 flex  bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
