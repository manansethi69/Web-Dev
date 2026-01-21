
import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants';

const Friends = ({ friends, handleUnfriend }) => {
    return (
        <div className="space-y-5 px-2 mt-10">
            {friends.length > 0 ? friends.map((friend) => (
                <div key={friend.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-9 h-9 rounded-full" src="https://cdn.pixabay.com/photo/2022/05/09/18/05/dog-7185274_640.jpg" alt="" />
                        <div className="ml-2">
                            <p className="text-sm font-semibold">{friend.email}</p>
                        </div>
                    </div>
                    <p className="text-red-700 text-sm font-semibold cursor-pointer" onClick={() => handleUnfriend(friend.id)}>Unfriend</p>
                </div>
            )) : <>No friends</>}
        </div>
    );
};

export default Friends;
