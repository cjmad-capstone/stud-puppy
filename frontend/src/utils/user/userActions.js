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

export const registerUser = async ({ username, email, address, password }) => {
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                address,
                password,
            }),
        });
        const data = await response.json();
        return Promise.resolve(data);
    } catch (e) {
        return Promise.reject(e);
    }
};

export const logoutUser = () => localStorage.removeItem('user');

export const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));
