import React, {useEffect, useState} from 'react'
import Sidebar from "../../Components/Sidebar/Sidebar";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Auth from "../Auth/Auth";
import EditAccount from "../../Components/EditAccount/EditAccount";
import {useAuth} from "../../Components/Register/AuthContext";
import Admin from "../Admin/Admin";
import Groups from '../Groups/Groups';
import axios from "axios";
import {BASE_URL} from "../../Constants";

const PrivateRoute = ({ children, role }) => {
    const { isAuthenticated } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            axios.get(`${BASE_URL}/users/isAdmin/${localStorage.getItem('userId')}`)
                .then(response => setIsAdmin(response.data))
                .catch(() => setIsAdmin(false));
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role === 'admin' && !isAdmin) {
        return <div>You are not admin</div>;
    }

    return children;
}


const Router = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    return(
        <div>
            {(location.pathname!=="/login" && location.pathname !== "/signup" && location.pathname!=="/forgot")&&(
            <div className="flex">
                <div className="w-[20%] border border-1-slate-500">
                    <Sidebar/>
                </div>
            <div className="w-full">
            <Routes>
                <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}></Route>
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
                <Route path="/account/edit" element={<PrivateRoute><EditAccount /></PrivateRoute>}></Route>
                <Route path="/admin" element={<PrivateRoute role="admin"><Admin /></PrivateRoute>} />
                <Route path="/groups" element={<PrivateRoute><Groups /></PrivateRoute>} />
            </Routes>
            </div>

        </div>)}
            {(location.pathname!=="/login" || location.pathname !== "/signup" || location.pathname!=="/forgot")&&(
            <div>
                <Routes>
                <Route path="/signup" element={<Auth />}></Route>
                <Route path="/login" element={<Auth />}></Route>
                    <Route path="/forgot" element={<Auth />}></Route>
                </Routes>
            </div>
                )}
        </div>

    )
}

export default Router