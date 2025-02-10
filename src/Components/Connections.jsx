import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import "@fontsource/roboto";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionsSlice";
import { Link } from "react-router";

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
    return (
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 h-screen">
        <h2 className="text-4xl font-bold text-gray-200 mb-6 animate-bounce">
          No Connections Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg text-lg">
          It looks like you don't have any active Connections at the moment.
          Please Check the requests to make Connection !
        </p>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105"
          onClick={() => {
            navigate("/request");
          }}
        >
          See Requests
        </button>
      </main>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-3xl font-bold text-white mb-8 text-center">
        Connections
      </h3>

      <div className="space-y-6">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="group flex items-center gap-8 bg-base-300 p-6 rounded-lg hover:bg-base-200 transition-all duration-300 w-3/4 mx-auto"
          >
            <div className="flex-shrink-0">
              <img
                src={connection.photoUrl}
                className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300"
                alt=""
              />
            </div>

            <div className="flex-grow grid grid-cols-2 gap-4">
              <div>
                <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-base text-base-content/70 line-clamp-2 group-hover:line-clamp-none">
                  {connection.about}
                </p>
              </div>
              <div className="flex items-center justify-end">
                <button className="btn btn-primary px-8">
                  <Link to={"/chat/" + connection._id}>Chat</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
