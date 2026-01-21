





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Constants';

const styles = {
    searchContainer: {
        padding: '1rem',
        border: '1px solid rgb(220, 220, 220)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        width: '300px',
        height: '100vh',
        zIndex: 10,
        overflowY: 'auto', // Enables vertical scrolling
    },
    searchInput: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f2f2f2',
        padding: '8px 12px',
        fontSize: '14px',
        width: '100%',
        marginBottom: '1rem',
        boxSizing: 'border-box',
        outline: 'none',
    },
    userCard: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    userAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '1rem',
    },
    userDetails: {
        flexGrow: 1,
    },
    groupDropdown: {
        marginBottom: '1rem',
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
    },
};

const SearchComponents = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        axios.get(BASE_URL + '/users/all')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
    };

    const groupIds = {
        'Tech Enthusiasts': 'tech-enthusiasts-id',
        'Foodies Unite': 'foodies-unite-id',
        'Travel Junkies': 'travel-junkies-id',
        'Fitness Fanatics': 'fitness-fanatics-id',
        'Bookworms': 'bookworms-id',
    };

    const filteredUsers = users
        .filter(user => {
            const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        })
        .filter(user => {
            if (selectedGroup === '') return true;
            return user.groupId === groupIds[selectedGroup];
        });

    return (
        <div style={styles.searchContainer}>
            <h1 className="text-xl font-bold mb-4">Search Users</h1>
            <input
                style={styles.searchInput}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <select
                style={styles.groupDropdown}
                value={selectedGroup}
                onChange={handleGroupChange}
            >
                <option value="">All Groups</option>
                <option value="Tech Enthusiasts">Tech Enthusiasts</option>
                <option value="Foodies Unite">Foodies Unite</option>
                <option value="Travel Junkies">Travel Junkies</option>
                <option value="Fitness Fanatics">Fitness Fanatics</option>
                <option value="Bookworms">Bookworms</option>
            </select>

            <div>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <div key={user.id} style={styles.userCard}>
                            <img
                                src="https://cdn.pixabay.com/photo/2022/05/09/18/05/dog-7185274_640.jpg"
                                alt="Avatar"
                                style={styles.userAvatar}
                            />
                            <div style={styles.userDetails}>
                                <p className="font-semibold">{user.firstName || 'No Name'} {user.lastName}</p>
                                <p className="text-xs text-gray-600">{user.email}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export default SearchComponents;


