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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4 md:mb-6 animate-bounce">
          No Connections Found
        </h2>
        <p className="text-gray-400 mb-6 md:mb-8 max-w-lg text-base md:text-lg px-4">
          It looks like you don't have any active Connections at the moment.
          Please Check the requests to make Connection !
        </p>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-6 md:py-3 md:px-8 rounded-lg shadow-lg text-base md:text-lg transition-transform transform hover:scale-105"
          onClick={() => {
            navigate("/request");
          }}
        >
          See Requests
        </button>
      </main>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-8">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center">
        Connections
      </h3>

      <div className="space-y-4 md:space-y-6">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="group flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 bg-base-300 p-4 md:p-6 rounded-lg hover:bg-base-200 transition-all duration-300 w-full sm:w-11/12 md:w-4/5 lg:w-3/4 mx-auto"
          >
            <div className="flex-shrink-0">
              <img
                src={connection.photoUrl}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300"
                alt={`${connection.firstName} ${connection.lastName}`}
              />
            </div>

            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full text-center sm:text-left">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors duration-300 mt-2 sm:mt-0">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-sm md:text-base text-base-content/70 line-clamp-2 group-hover:line-clamp-none">
                  {connection.about}
                </p>
              </div>
              <div className="flex items-center justify-center sm:justify-end mt-3 sm:mt-0">
                <button className="btn btn-primary px-4 md:px-8 py-2 text-sm md:text-base">
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
