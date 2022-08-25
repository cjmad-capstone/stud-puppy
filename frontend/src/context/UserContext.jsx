import React, { useEffect, useLayoutEffect } from 'react';
import { fetchUser, logoutUser } from '../utils/user/userActions.js';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState();

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    useLayoutEffect(() => {
        fetchUser().then((user) => setUser(user));
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
