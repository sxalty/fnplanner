import React from "react";
import ReactDOM from "react-dom/client";
import Frontpage from "./pages/frontpage"; // Check casing matches your file name!
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Frontpage />
  </React.StrictMode>
);