import { Outlet, Navigate } from "react-router-dom";
export const isLoggedIn = true;
const MainLayout = () => {
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Outlet />;
};

export default MainLayout;
