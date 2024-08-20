import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ allowedRoles, children }) => {
  const [cookies] = useCookies(["role"]);
  const location = useLocation();
  const userRole = cookies.role;

  console.log("User Role:", userRole); // Thêm log để kiểm tra vai trò

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
