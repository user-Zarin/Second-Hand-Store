import React, { useState } from 'react';
import { Delete } from "@material-ui/icons";

const Users = () => {
    const [ranges, setRanges] = useState({
        sell: 50,
        buy: 50
    });

    const handleRange = (event, type, id) => {
        setRanges(prevRanges => ({
            ...prevRanges,
            [id]: {
                ...prevRanges[id],
                [type]: event.target.value
            }
        }));
    };

    const users = [
        { id: 1, name: 'ayman', email: 'ayman@2004' },
        { id: 2, name: 'zarin', email: 'ayman@2004' },
        { id: 3, name: 'zoya', email: 'ayman@2004' },
        { id: 4, name: 'nikita', email: 'ayman@2004' },
        { id: 5, name: 'sondarya', email: 'ayman@2004' },
        { id: 6, name: 'salwa', email: 'ayman@2004' },
        { id: 7, name: 'afroz', email: 'ayman@2004' },
        { id: 8, name: 'tasnim', email: 'ayman@2004' }
    ];

    const image = 'https://thumbs.dreamstime.com/b/d-avatar-illustration-smiling-happy-girl-cartoon-close-up-portrait-standing-isolated-transparent-png-background-generative-272798686.jpg';

    return (
        <div className="min-h-screen w-full pt-14 container mx-auto bg-gray-100">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">User Management</h1>
            <table className="table-auto w-[90vw] bg-white shadow-2xl rounded-lg">
                <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <tr>
                        <th className="p-4">Profile</th>
                        <th className="p-4">Username</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Sell</th>
                        <th className="p-4">Buy</th>
                        <th className="p-4">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b last:border-none hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td className="p-4 "><img src={image} alt="" className="rounded-full w-14 h-14" /></td>
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                                <input 
                                    type="range" 
                                    max="100" 
                                    value={ranges[user.id]?.sell || 50} 
                                    onChange={(e) => handleRange(e, 'sell', user.id)} 
                                    className="w-full"
                                />
                            </td>
                            <td className="p-4">
                                <input 
                                    type="range" 
                                    max="100" 
                                    value={ranges[user.id]?.buy || 50} 
                                    onChange={(e) => handleRange(e, 'buy', user.id)} 
                                    className="w-full"
                                />
                            </td>
                            <td className="p-4">
                                <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full px-4 py-2 hover:shadow-lg transition duration-300 ease-in-out">
                                    <Delete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
