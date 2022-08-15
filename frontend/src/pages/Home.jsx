import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // fetch('/api/users')
        //     .then(res => res.json())
        //     .then(data => setUsers(data));
        axios.get('/api/users/').then(res => setUsers(res.data));
    }, []);
    return (
        <motion.main
            {...pt}
        >

            <div>
                {
                    users.map((user, idx) => {
                        return (<div key={idx}>yo</div>);
                    })
                }
            </div>
        </motion.main>
    );
};
export default Home;