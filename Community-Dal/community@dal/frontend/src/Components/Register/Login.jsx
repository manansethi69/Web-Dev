import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthContext";
import {BASE_URL} from '../../Constants';

const Login = () => {
        const { login } = useAuth();
        const [formData, setFormData] = useState({
            email: '',
            password: ''
        });
        const [error, setError] = useState('');
        const navigate= useNavigate();

        const handleNavigateSignup=()=>navigate("/signup")
        const handleNavigateForgot=()=>navigate("/forgot")


        const validateEmail = (email) => {
            return email.endsWith('@dal.ca');
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!validateEmail(formData.email)) {
                setError('Email must be a dal.ca address');
                return;
            }
            if (formData.password === '') {
                setError('Password is required');
                return;
            }
            setError('');

            try {
                const response = await axios.post(BASE_URL + '/users/login', formData);
                console.log(response);
                alert('Login successful');
                login();  // Assuming login() updates the user's authentication state
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userId',response.data.id);

                navigate('/');
            } catch (error) {
                alert("Login Failure");
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
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

    const buttonStyle2 = {
        backgroundColor: 'orange',
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
    return(
        <div>
            <div>
                <h1 className="text-4xl"><strong>LOG IN</strong></h1>
                <br/>
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
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit" style={buttonStyle}>Login</button>
                </form><br/><br/>
                <button style={buttonStyle2} onClick={handleNavigateForgot}>Forgot Password</button><br/>
                <br/>
                    New Here?<br/>
                <button style={buttonStyle2} onClick={handleNavigateSignup}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login