import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import {
  UseStateSlider, 
  Counter, 
  UseCallBackSlider,
  UseMemoSlider,
 } from "./Hooks/index";
import "./style/style.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    {/* <App/> */}

    {/* <UseStateSlider/> */}
    {/* <UseCallBackSlider/> */}
    <UseMemoSlider/>
    {/* <Counter counter={0}/> */}
  </StrictMode>
);
