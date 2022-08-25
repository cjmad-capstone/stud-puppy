import { fetchUser } from '../utils/user/userActions.js';
import { withAuth } from '../utils/auth/withAuth.jsx';
import { pt } from '../utils/anim/pageTransitions.js';
import { motion } from 'framer-motion';
import Nav from '../components/Nav/Nav.jsx';
import Button from '../components/Button/Button.jsx';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import DogCard from '../components/DogCard/DogCard.jsx';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(UserContext);
    const { data: userDogs } = useQuery(
        ['userDogs'],
        () => fetch(`/api/users/${user.id}/dogs`).then((res) => res.json()),
        {
            // The query will not execute until the userId exists
            enabled: !!user,
        }
    );

    if (!user) return null;
    return (
        <motion.main {...pt} className={`px-4`}>
            <div className={`w-full flex justify-center`}>
                <div className={`text-center`}>
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                    <h1 className={`text-5xl`}>{user.name ?? user.username}</h1>
                </div>
            </div>
            <h1 className="text-6xl font-brand font-bold pb-4 pt-8 text-center">
                Your Dogs
            </h1>

            {/*Dog Cards*/}
            <div className={`flex gap-3 flex-wrap justify-center`}>
                {userDogs?.map((dog, idx) => (
                    <DogCard dog={dog} key={idx} />
                ))}
            </div>
        </motion.main>
    );
};

export default withAuth(Profile, '/login');
