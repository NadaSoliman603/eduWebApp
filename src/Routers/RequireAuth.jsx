import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {

    const location = useLocation();
    const token = sessionStorage.getItem("_UT")
    // console?.log({ location }, token && location?.pathname === "/")

    if (token && location?.pathname === "/") {
        return <Navigate to="/home" state={{ from: location }} replace />
    }
    return (token) ? (
        children
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default RequireAuth;
