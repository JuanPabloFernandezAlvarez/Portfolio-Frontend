import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./assets/App.css";
import App from "./App.jsx";
import  ThemeContextProvider  from "./services/theme/ThemeContextProvider.jsx"
import AuthContextProvider from "./services/authContext/AuthContextProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </ThemeContextProvider>
  </StrictMode>
);
