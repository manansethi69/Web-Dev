import React, { useEffect, useState } from 'react';
import Suggestions from './Suggestions';
import axios from 'axios';
import { BASE_URL } from '../../Constants';
import Requests from './Requests';
import Friends from './Friends';

const HomeRight = () => {
    const userId = localStorage.getItem('userId');
    const [recommendations, setRecommendations] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const handleReject = (requestId) => {
        const updatedRequests = pendingRequests.filter(r => r.id !== requestId);
        setPendingRequests(updatedRequests);
    };

    const handleAccept = (requestId) => {
        const updatedRequests = pendingRequests.filter(r => r.id !== requestId);
        setPendingRequests(updatedRequests);
        fetchFriends(); // Update friends list after accepting a request
    };

    const handleUnfriend = (friendId) => {
        axios.delete(`${BASE_URL}/friend-requests/unfriend/${userId}/${friendId}`).then(() => {
            setFriends(friends.filter(friend => friend.id !== friendId));
        }).catch(err => {
            console.error('Error unfriending:', err);
        });
    };

    const fetchFriends = () => {
        axios.get(`${BASE_URL}/friend-requests/friends/${userId}`).then(res => {
            setFriends(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        axios.get(`${BASE_URL}/users/get-recommendations/${userId}`).then(res => {
            setRecommendations(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URL}/friend-requests/pending/${userId}`).then(res => {
            setPendingRequests(res.data);
        }).catch(err => {
            console.log(err);
        });

        fetchFriends();
    }, []);

    return (
        <div>
            <div>

                <div className="border" style={{padding: "20px", borderRadius: "10px", marginBottom: "20px"}}>
                    <div className="space-y-5 px-2">
                        Friend Requests
                    </div>
                    <div className="space-y-5 px-2 mt-10">
                        {pendingRequests.length > 0 ? pendingRequests.map((item) => <Requests key={item.id}
                                                                                              status={!item.status ? "pending" : "accepted"}
                                                                                              username={item.sender.email}
                                                                                              id={item.id}
                                                                                              handleReject={handleReject}
                                                                                              handleAccept={handleAccept}/>) : <>No
                            friend requests</>}
                    </div>
                </div>
                <div className="border" style={{padding: "20px", borderRadius: "10px", marginBottom: "20px"}}>
                    <div className="space-y-5 px-2">
                        My Friends
                    </div>
                    <Friends friends={friends} handleUnfriend={handleUnfriend}/>
                </div>
                <div className="border" style={{padding: "20px", borderRadius: "10px"}}>
                    <div className="space-y-5 px-2">
                        Friend Recommendations
                    </div>
                    <div className="space-y-5 px-2 mt-10">
                        {recommendations.length > 0 ? recommendations.slice(0, 6).map((item) => <Suggestions key={item.id}
                                                                                                 username={item.email}
                                                                                                 id={item.id}/>) : <>No
                            friend recommendations</>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeRight;
