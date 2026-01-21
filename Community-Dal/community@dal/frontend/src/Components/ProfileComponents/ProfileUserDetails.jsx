import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import { BASE_URL } from '../../Constants';
import axios from 'axios';

export const ProfileUserDetails = () => {
    const  userId = localStorage.getItem('userId');
    const [user,setUser] = useState({
        status: 'Available',
        firstName: 'John',
        lastName:'Doe',
        username: 'johndoe123',
        website: 'https://example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        gender: 'Male'
    });    
    
    useEffect(() => {
        axios.get(BASE_URL + `/users/${userId}`).then(res=>{
            console.log(res)
            setUser(res.data)
        }).catch(err=>{
            console.log(err)
        });
    },[]); 
    const getStatusColor = (status) => {
        switch (status) {
            case 'Available':
                return 'green';
            case 'Busy':
                return 'red';
            case 'Away':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    const navigate=useNavigate()
    return(
        <div className="py-10 w-full">
            <div className="flex items-center">
                <div className="w-[15%]">
                    <img className="w-32 h-32 rounded-full" src ="https://cdn.pixabay.com/photo/2024/05/08/17/45/animal-8748794_640.jpg" alt="" />
                </div>
                <div className="space-y-5">
                    <div className="flex space-x-10 items-center">
                        <p>{user.username}</p>
                        <button onClick={() => navigate("/account/edit")}>Edit Profile</button>
                        <div
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: getStatusColor(user.status),
                            }}
                        ></div>
                        <span>{user.status}</span>
                </div>
                <div className="flex space-x-10">
                    <div>
                        <span className="font-semibold mr-2">10</span>
                        <span>posts</span>
                    </div>

                    <div>
                        <span className="font-semibold mr-2">5</span>
                        <span>follower</span>
                    </div>
                        <div>
                            <span className="font-semibold mr-2">7</span>
                            <span>following</span>
                        </div>

                    </div>
                    <div>
                        <p className="font-semibold">{user.firstName+" "+user.lastName}</p>
                        <p className="font-thin textsm">{user.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
