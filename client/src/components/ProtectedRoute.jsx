import { Navigate } from "react-router-dom";

const getDashboardPath = (role) =>
  role === "company" ? "/company/dashboard" : "/jobseeker/dashboard";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!token || !userString) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={getDashboardPath(user.role)} replace />;
  }

  return children;
};

export default ProtectedRoute;
