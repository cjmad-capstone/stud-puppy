export const authenticateUser = async (username, password) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();
        if (data.token) localStorage.setItem('user', JSON.stringify(data));
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
};


export const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));
