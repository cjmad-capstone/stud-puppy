import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetch('/api/users')
        //     .then(res => res.json())
        //     .then(data => setUsers(data));
        axios.get('/api/users/').then(res => setUsers(res.data));
    }, []);
    return (
        <div>
            {
                users.map((user, idx) => {
                    return (<div>yo</div>);
                })
            }
        </div>
    );
};
export default Home;