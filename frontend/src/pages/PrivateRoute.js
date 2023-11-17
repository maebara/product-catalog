import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = window.localStorage.getItem("token");

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/login" />
}

export default PrivateRoute;