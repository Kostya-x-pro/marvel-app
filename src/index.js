import {StrictMode} from "react";
import { createRoot } from "react-dom/client";
// import App from "./components/app/App";
// import ReactTransitionGroup from "./ReactTransitionGroup/ReactTransitionGroup";
import Formic from "./Formic-YUP/Formic";
import "./style/style.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    {/* <App /> */}
    {/* <ReactTransitionGroup/> */}
    <Formic/>
  </StrictMode>
);