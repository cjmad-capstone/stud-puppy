import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';

const Home = () => {
    const [users, setUsers] = useState([]);

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