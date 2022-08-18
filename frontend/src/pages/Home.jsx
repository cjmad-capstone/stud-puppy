import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import DogCard from '../components/DogCard/DogCard.jsx';

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

    const { data: dogs } = useQuery(['dogs'], fetchDogs);

    return (
        <motion.main {...pt} className={`p-4`}>
            <div className={`flex gap-3 flex-wrap justify-center`}>
                {dogs?.map((dog, idx) => (
                    <DogCard dog={dog} key={idx} />
                ))}
            </div>
        </motion.main>
    );
};
export default Home;
