import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    // If NOT logged in, redirect to signin
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default PrivateRoute;
