import { Navigate } from "react-router-dom";
import sessionStorage from "./SessionStorage";

const PrivateComponent = ({ children }) => {
    const isAuthenticated = sessionStorage.getToken();

    if (isAuthenticated) {
        return children
    }

    return <span></span>
}

export default PrivateComponent;