import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../Constants';
import axios from 'axios';
import './EditProfileForm.css'; // Import CSS file for styling (create this file and define styles)
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
    // Sample initial data (replace with actual data retrieval logic)
    const userId = localStorage.getItem('userId');

    const [initialData, setData] = useState({
        status: '',
        firstName: '',
        lastName: '',
        username: '',
        bio: '',
        email: ''
    });
    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(BASE_URL + `/users/${userId}`).then(res => {
            console.log(res)
            setFormData(res.data)
        }).catch(err => {
            console.log(err)
        });
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with logic to handle form submission (e.g., API call)
        console.log('Form submitted with data:', formData);
        // Optionally, update state or display success message

        axios.put(BASE_URL + `/users/${userId}`, formData).then(res => {
            console.log(res);
            navigate('/profile');
        }).catch(err => {
            console.log(err)
        });
    };

    return (
        <div className="edit-profile-form-container">
            <h1 className="text-2xl"><strong>Edit Profile</strong></h1><br />
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Status:</label>
                    <select name="status" value={formData.status} onChange={handleChange}>
                         <option value="">Select status</option>
                        <option value="Away">Away</option>
                        <option value="Busy">Busy</option>
                        <option value="Available">Available</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Personal Interests:</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label>Email Address:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Security question:</label>
                    <input
                        type="tel"
                        name="securityQuestion"
                        value={formData.securityQuestion}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Security answer:</label>
                    <input
                        type="tel"
                        name="securityAnswer"
                        value={formData.securityAnswer}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditAccount;
