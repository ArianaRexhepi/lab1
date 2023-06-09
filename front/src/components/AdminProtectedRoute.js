import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const AdminProtectedRoute = ({ redirectPath }) => {
  const state = useSelector((state) => state);

  let isAdmin = false;
  if (state.user) {
    const role = state.user.userRoles.find((role) => role === "Admin");
    if (role) {
      isAdmin = true;
    }
  }

  if (!state.user || !isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
