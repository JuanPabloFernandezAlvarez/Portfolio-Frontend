import { useState } from "react";
import { AuthContext } from "./Auth.Context";

const tokenSaved = localStorage.getItem("Portfolio-2026-Token");

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenSaved);

  const handleUserLogin = (newToken) => {
    localStorage.setItem("Portfolio-2026-Token", newToken);
    setToken(newToken);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("Portfolio-2026-Token");
    setToken("");
  };

  return (
    <AuthContext value={{ token, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext>
  );
};

export default AuthContextProvider;
