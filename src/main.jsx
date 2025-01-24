import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/roboto"; // Import with default weight

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
