import { getCurrentUser } from '../user/userActions.js';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const withAuth = (Component, redirect) => (props) => {
    const user = getCurrentUser();
    const navigator = useNavigate();
    useEffect(() => {
        if (!user) navigator(redirect ?? '/login');
    }, [navigator, user]);

    return user ? <Component {...props} /> : null;
};
