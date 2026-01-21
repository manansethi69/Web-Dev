import React from 'react'
import {useAuth} from "../Register/AuthContext";

const Top = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';  // Redirect to login page after logout
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default Top