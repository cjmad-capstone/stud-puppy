import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';

const Home = () => {
    const [users, setUsers] = useState([]);

    const fetchDogs = async () => {
        const res = await fetch('/api/dogs', {
            headers: {
                ...authHeader(),
            },
        });
        return res.json();
    };

    const { data } = useQuery(['dogs'], fetchDogs);

    console.log(data);

    return (
        <motion.main {...pt}>
            <div>
                {users.map((user, idx) => {
                    return <div key={idx}>yo</div>;
                })}
            </div>
        </motion.main>
    );
};
export default Home;
