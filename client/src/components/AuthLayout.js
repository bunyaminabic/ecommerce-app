import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "./MainLayout";

const AuthLayout = () => {
  if (isLoggedIn) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};

export default AuthLayout;
