import { getCurrentUser, logoutUser } from '../utils/user/userActions.js';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext.jsx';

const Logout = () => {
    const navigator = useNavigate();
    const { logout } = useContext(UserContext);
    useEffect(() => {
        logout();
        navigator('/');
    }, [navigator, logout]);
};

export default Logout;
