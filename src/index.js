import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import HOC from "./HOC/HOC";

import {
  UseStateSlider, 
  Counter, 
  UseCallBackSlider,
  UseRefForm,
  UseMemoSlider,
  CustomHook,
  UseReduser,
  MyTestTransition,
 } from "./Hooks/index";

import "./style/style.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    {/* <App/> */}

    {/* <UseStateSlider/> */}
    {/* <UseCallBackSlider/> */}
    {/* <UseMemoSlider/> */}
    {/* <UseRefForm/> */}
    {/* <CustomHook/> */}
    {/* <MyTestTransition/> */}
    {/* <UseReduser/> */}
    <HOC/>
    {/* <Counter counter={0}/> */}
  </StrictMode>
);
