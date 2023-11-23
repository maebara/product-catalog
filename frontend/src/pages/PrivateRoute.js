import { Navigate } from "react-router-dom";
import sessionStorage from "../components/SessionStorage";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getToken();

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/login" />
}

export default PrivateRoute;