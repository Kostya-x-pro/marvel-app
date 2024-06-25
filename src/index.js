import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import Converter from "./Hooks/useEffect/Converter"
import "./style/style.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    {/* <App/> */}

    <Converter currency={1}/>
  </StrictMode>
);
