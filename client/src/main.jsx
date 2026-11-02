import React from "react";
import ReactDOM from "react-dom/client";
import Frontpage from "./pages/frontpage";
import Calendarpage from "./pages/calendarpage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Calendarpage />
  </React.StrictMode>
);
//    <Frontpage />