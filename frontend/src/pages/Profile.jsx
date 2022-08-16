import { getCurrentUser } from '../utils/user/userActions.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const user = getCurrentUser();
    const nav = useNavigate();
    useEffect(() => {
        nav('/login');
    }, []);
    if (!user) return null;
    return (
        <div>Test</div>
    );
};