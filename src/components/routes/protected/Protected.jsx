import { useContext } from "react";
import { AuthContext } from "../../../services/authContext/Auth.Context";
import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const { token } = useContext(AuthContext);
  if (!token) {
    return <Navigate to='/home' replace />;
  }
  return <Outlet />;
};

export default Protected;
