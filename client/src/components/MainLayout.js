import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const MainLayout = () => {
  const [user, isloading] = useAuthState(auth);
  if (isloading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default MainLayout;
