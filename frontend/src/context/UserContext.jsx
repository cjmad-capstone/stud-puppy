import React, { useEffect, useLayoutEffect } from 'react';
import { getCurrentUser } from '../utils/user/userActions.js';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState();

    useLayoutEffect(() => {
        setUser(getCurrentUser());
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
