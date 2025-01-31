import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [input, setInput] = useState({
        name: "User",
        email: "user@example.com",
        address: "1234 Elm Street",
        contact: "123-456-7890",
        city: "Goa",
        pincode: "123432",
      });
      
    return (
        <UserContext.Provider value={{ input, setInput }}>
            {children}
        </UserContext.Provider>
    );
};
