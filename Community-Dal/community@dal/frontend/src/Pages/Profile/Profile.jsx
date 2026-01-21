import React from 'react'
import {ProfileUserDetails} from "../../Components/ProfileComponents/ProfileUserDetails";
import ReqUserPost from "../../Components/ProfileComponents/ReqUserPost";

const Profile = () => {
    return(
        <div className="px-20">
            <div>
                <ProfileUserDetails />
            </div>
            <div>
                <ReqUserPost/>
            </div>
        </div>
    )
}

export default Profile