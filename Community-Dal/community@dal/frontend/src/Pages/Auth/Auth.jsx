import React from 'react';
import "./Auth.css";
import Login from "../../Components/Register/Login";
import Signup from "../../Components/Register/Signup";
import {useLocation} from "react-router-dom";
import Forgot from "../../Components/Register/Forgot";

const Auth = () => {
    const location=useLocation();
    return(
        <div>
            <div className="flex items-center justify-center j-[100vh]">
                <div>
                    <div className="h-[35.3rem] w-[23rem]">
                        <img className="" src="/logodal.png" alt=""/>

                    </div>
                </div>
                <div>
                    {location.pathname === "/login" ? <Login /> : (location.pathname === "/signup" ? <Signup /> : <Forgot />)}


                </div>
            </div>

        </div>
    )
}

export default Auth