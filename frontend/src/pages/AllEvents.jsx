import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import EventCard from '../components/EventCard/EventCard.jsx';

const AllEvents = () => {

    const fetchEvents = async () => {
        const res = await fetch('/api/events')
        return res.json();
    };

    const { data: events } = useQuery(['event'], fetchEvents);

    return (
        <motion.main {...pt} className={`p-4`}>
            <div className={`flex gap-3 flex-wrap justify-center`}>
                {events?.map((event, idx) => (
                    <EventCard event={event} key={idx} />
                ))}
            </div>
        </motion.main>
    );
};
export default AllEvents;