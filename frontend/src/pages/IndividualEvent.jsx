import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import EventCard from '../components/EventCard/EventCard.jsx';
import {useParams} from "react-router-dom";

const IndividualEvent = () => {
    const { id } = useParams();

    const { data: event, error } = useQuery(['event', id], () =>
        fetch(`/api/events/${id}`).then((res) => res.json()));

    if (!event) return <main></main>;

    return (
        <motion.main {...pt} className={`p-4`}>
            <div className={`flex gap-3 flex-wrap justify-center`}>

                    <EventCard event={event.name} />

            </div>
        </motion.main>
    );
};
export default IndividualEvent