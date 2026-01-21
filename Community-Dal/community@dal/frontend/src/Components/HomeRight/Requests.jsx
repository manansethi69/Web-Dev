import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants';

const Requests = (request) => {
    const [requestStatus, setRequestStatus] = useState(request.status);

    const handleAcceptClick = () => {
        axios.post(BASE_URL + `/friend-requests/accept/${request.id}`)
            .then(res => {
                setRequestStatus('accepted');
                request.handleAccept(request.id); // Notify parent component
            })
            .catch(err => {
                console.error('Error accepting request:', err);
            });
    };

    const handleRejectClick = () => {
        axios.post(BASE_URL + `/friend-requests/reject/${request.id}`)
            .then(res => {
                setRequestStatus('rejected');
                request.handleReject(request.id); // Notify parent component
            })
            .catch(err => {
                console.error('Error rejecting request:', err);
            });
    };

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img className="w-9 h-9 rounded-full" src="https://cdn.pixabay.com/photo/2022/05/09/18/05/dog-7185274_640.jpg" alt="" />
                <div className="ml-2">
                    <p className="text-sm font-semibold">{request.username}</p>
                </div>
            </div>
            {requestStatus === 'pending' && (
                <>
                    <p className="text-blue-700 text-sm font-semibold cursor-pointer" onClick={handleAcceptClick}>Accept</p>
                    <p className="text-red-700 text-sm font-semibold cursor-pointer ml-2" onClick={handleRejectClick}>Reject</p>
                </>
            )}
            {requestStatus === 'accepted' && (
                <p className="text-green-700 text-sm font-semibold">Accepted</p>
            )}
            {requestStatus === 'rejected' && (
                <p className="text-gray-500 text-sm font-semibold">Rejected</p>
            )}
        </div>
    );
};

export default Requests;
