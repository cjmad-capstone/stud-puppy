import { authHeader } from '../auth/authHeader.js';

export const authenticateUser = async ({ username, password }) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await response.json();
        if (data.token) localStorage.setItem('user', JSON.stringify(data));
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const registerUser = async ({ username, email, zipCode, password }) => {
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                zipCode,
                password,
            }),
        });
        const data = await response.json();
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const fetchUser = async () => {
    const user = getCurrentUser();
    if (!user) return Promise.reject(null);
    try {
        const response = await fetch(`/api/users/me`, {
            method: 'GET',
            headers: {
                ...authHeader(),
            },
        });
        const data = await response.json();
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const logoutUser = () => {
    localStorage.removeItem('user');
};
