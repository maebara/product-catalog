import { Navigate } from "react-router-dom";

const PrivateComponent = ({ children }) => {
    const isAuthenticated = window.localStorage.getItem("token");

    if (isAuthenticated) {
        return children
    }

    return <span></span>
}

export default PrivateComponent;