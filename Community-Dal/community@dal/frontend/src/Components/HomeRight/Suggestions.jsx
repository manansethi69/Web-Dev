import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants';

const Suggestions = (recommendation) => {
    const userId = localStorage.getItem('userId');
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollowClick = () => {
        axios.post(BASE_URL + `/friend-requests/send`, { senderId: userId, receiverId: recommendation.id }).then(res => {
            setIsFollowing(true);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img className="w-9 h-9 rounded-full" src="https://cdn.pixabay.com/photo/2022/05/09/18/05/dog-7185274_640.jpg" alt="" />
                <div className="ml-2">
                    <p className="text-sm font-semibold">{recommendation.username}</p>
                </div>
            </div>
            <p className="text-blue-700 text-sm font-semibold cursor-pointer" onClick={handleFollowClick}>
                {isFollowing ? 'Sent' : 'Add Friend'}
            </p>
        </div>
    );
};

export default Suggestions;
