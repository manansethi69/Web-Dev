import React, { useState } from 'react';
import axios from 'axios';
import {redirect, useNavigate} from "react-router-dom";
import {BASE_URL} from '../../Constants';
const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        securityAnswer: '',
        newPassword: ''
    });
    const [error, setError] = useState('');

    const navigate= useNavigate();
    const handleNavigateLogin=()=>navigate("/login")

    const correctSecurityAnswer = 'Your correct security answer'; // Replace with actual value

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateEmail = (email) => {
        return email.endsWith('@dal.ca');
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(formData.email)) {
            setError('Email must be a dal.ca address');
            return;
        }
     
        if (!validatePassword(formData.newPassword)) {
            setError('Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
            return;
        }
        setError('');
        console.log(formData)
        try {
            axios.post(BASE_URL + '/users/forgot', formData).then(res=>{
                console.log(res)
                alert('Password reset successful');
                navigate('/login')
            }).catch(err=>{
                alert('Password reset unsuccessful');
            });
            
        } catch (error) {
            alert(error.response.data);
        }
    };


    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        margin: '10px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '10px'
    };

    const inputStyle = {
        border: '2px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        width: '100%'
    };

    return (
        <div>
            <div>
                <h1 className="text-4xl"><strong>FORGOT PASSWORD</strong></h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label>Security Answer (Name of your first pet):</label>
                        <input
                            type="text"
                            name="securityAnswer" value={formData.securityAnswer}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" style={buttonStyle}>Reset Password</button>
                </form>
                <br /><br />
                Remembered your password?<br />
                <button style={buttonStyle} onClick={handleNavigateLogin}>Login</button>
            </div>
        </div>
    );
};

export default ForgotPassword;
