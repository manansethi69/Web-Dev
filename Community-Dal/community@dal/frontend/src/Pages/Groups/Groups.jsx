import React from 'react';

const Groups = () => {
    const groups = [
        { name: 'Tech Enthusiasts', description: 'A group for tech lovers to discuss the latest trends.' },
        { name: 'Foodies Unite', description: 'Share and discover new recipes and restaurants.' },
        { name: 'Travel Junkies', description: 'For those who love to explore new places.' },
        { name: 'Fitness Fanatics', description: 'Join us to discuss workouts and healthy living.' },
        { name: 'Bookworms', description: 'A community for those who love to read and discuss books.' }
    ];

    return (
        <div className="px-20 pt-10">
            <h2 className="text-2xl font-bold mb-5">Available Groups</h2>
            <div>
                {groups.map((group, index) => (
                    <div key={index} className="border rounded p-5 mb-5 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-semibold">{group.name}</h3>
                            <p>{group.description}</p>
                        </div>
                        <button className="bg-blue-500 text-white rounded px-4 py-2">Request to Join</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Groups;
