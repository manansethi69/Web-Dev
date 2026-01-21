import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {BASE_URL} from '../../Constants';

const Signup = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        securityAnswer: '',
        securityQuestion:'Name of your first pet'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const navigate= useNavigate();

    const handleNavigateLogin=()=>navigate("/login")

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
        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
            return;
        }
        if (formData.securityAnswer === '') {
            setError('Security question is required');
            return;
        }
        setError('');
        try {
            console.log(formData);
            const response = await axios.post(BASE_URL+ '/users/signup', formData);
            console.log(response);
            alert('User registered successfully');
            navigate('/login')
        } catch (error) {
            alert(error);
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
                <h1 className="text-4xl"><strong>SIGN UP</strong></h1>
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
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label>Security Question (Name of your first pet):</label>
                        <input
                            type="text"
                            name="securityAnswer"
                            value={formData.securityAnswer}
                            onChange={handleChange}
                            required
                            style={inputStyle}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
                <br /><br />
                Already have an account?<br />
                <button style={buttonStyle} onClick={handleNavigateLogin}>Login</button>
            </div>
        </div>
    );
};

export default Signup;
