import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/User";
import { Navigate, Outlet } from "react-router-dom";
function PrivateRoute(){
    const { input } = useContext(UserContext);
    return (
        <>
            {input ? <Outlet/> : <Navigate to="/login" />}
        </>
    )
}

export default PrivateRoute;