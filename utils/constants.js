import { io } from "socket.io-client";
const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:6969" : "/api";
export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};

export { BASE_URL };
