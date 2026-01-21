import React from 'react';

const styles = {
    userCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    userDetails: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '200px' // Adjust the width as needed
    }
};

const SearchUserCard = ({ firstName, username }) => {
    return (
        <div style={styles.userCard}>
            <div style={styles.userDetails}>
                <p className="text-sm font-semibold">{firstName ? firstName : username}</p>
                <p className="text-sm">{username}</p>
            </div>
        </div>
    );
};

export default SearchUserCard;
