import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [userRequests, setUserRequests] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/users/all`)
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        axios.get(`${BASE_URL}/users/not-activated`)
            .then(response => {
                setUserRequests(response.data)
                console.log(response.data)
            })
            .catch(error => console.error(error));
    }, []);
    const handleRoleChange = (id, role) => {
        axios.put(`${BASE_URL}/users/role/${id}`, { role })
            .then(response => {
                setUsers(users.map(user => user.id === id ? response.data : user));
            })
            .catch(error => console.error(error));
    };

    const handleActivate = (id) => {
        axios.put(`${BASE_URL}/users/activateUser/${id}`)
            .then(response => {
                const updatedUser = userRequests.filter(user=>user.id != id);
                setUserRequests(updatedUser);
            })
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        axios.delete(`${BASE_URL}/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="px-20 pt-10">
            <div className="flex">
                <div className="w-1/2 pr-5">
                    <h2 className="text-2xl font-bold mb-5">Change User Roles</h2>
                    {users.map(user => (
                        <div key={user.id} className="border rounded p-5 mb-5 flex justify-between items-center">
                            <p>{user.email}</p>
                            <select
                                className="border rounded p-2 mr-2"
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                                <option value="newbie">Newbie</option>
                                <option value="elite">Elite</option>
                                <option value="admin">Admin</option>
                            </select>
                            <button
                                className="bg-red-500 text-white rounded px-4 py-2"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <div className="border-r border-gray-300 mx-5 h-auto self-stretch"></div>

                <div className="w-1/2 pl-10">
                    <h2 className="text-2xl font-bold mb-5">User Join Requests</h2>
                    {
                        userRequests.map(userRequest => (
                            <div className="border rounded p-5 mb-5">
                                <p>{userRequest.email} wants to join Community Platform</p>
                                <button onClick={()=>handleActivate(userRequest.id)} className="bg-green-500 text-white rounded px-4 py-2 mr-2">Activate</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Admin;
