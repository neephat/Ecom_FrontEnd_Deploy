import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, userInfo } from "../../utils/auth";

const AdminRoute = ({ children }) => {
    const { role } = userInfo();
    if (isAuthenticated() && role === "admin") {
        return children;
    }
    return <Navigate to="/" replace />;
};

export default AdminRoute;
