import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ redirectPath }) => {
    const state = useSelector((state) => state);

  if (!state.user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};