import React from 'react';
import { withAuth } from '../utils/auth/withAuth.jsx';
import { pt } from '../utils/anim/pageTransitions.js';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import DogCard from '../components/DogCard/DogCard.jsx';
import { useQuery } from '@tanstack/react-query';
import EventCard from '../components/EventCard/EventCard.jsx';

const Profile = () => {
    const { user } = useContext(UserContext);

    const { data: userEvents } = useQuery(
        ['userEvents', user?.id],
        () => fetch(`/api/users/${user.id}/events`).then((res) => res.json()),
        {
            enabled: !!user,
        }
    );

    const { data: userDogs } = useQuery(
        ['userDogs', user?.id],
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
            <hr className={'block md:hidden border-t-2 border-secondary w-96 mx-auto pb-5'}/>

            {/*Dog Cards*/}
            <div className={`flex gap-3 flex-wrap justify-center`}>
                {userDogs?.map((dog, idx) => (
                    <DogCard dog={dog} key={idx} />
                ))}
            </div>
            <h1 className="text-6xl font-brand font-bold pb-4 pt-8 text-center">
                Your Events
            </h1>
            <hr className={'block md:hidden border-t-2 border-secondary w-96 mx-auto mb-10'}/>
            <div className={`flex gap-3 flex-wrap justify-center`}>
                {userEvents?.map((event, idx) => (
                    <EventCard event={event} key={idx} />
                ))}
            </div>
        </motion.main>
    );
};

export default withAuth(Profile, '/login');
