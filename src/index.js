import { createRoot } from "react-dom/client";
// import App from "./components/app/App";
// import MyTestApp from "./testComponents/whoAmI";
import MyTestForm from "./testComponents/Form";
import "./style/style.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
   {/* <App /> */}
  {/* <MyTestApp/> */}
  <MyTestForm/>
  </>
);
