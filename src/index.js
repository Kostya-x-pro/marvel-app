import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import {
  UseStateSlider, 
  Counter, 
  UseCallBackSlider,
  UseRefForm,
  UseMemoSlider,
  CustomHook,
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
    <MyTestTransition/>
    {/* <Counter counter={0}/> */}
  </StrictMode>
);
