import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AddList from "./components/AddList";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <AddList />

  </StrictMode>
);