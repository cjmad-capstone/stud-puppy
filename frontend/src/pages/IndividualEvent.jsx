import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import EventCard from '../components/EventCard/EventCard.jsx';
import { useParams } from 'react-router-dom';
import Button from '../components/Button/Button.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { format, parseISO } from 'date-fns';

const IndividualEvent = () => {
    const { id } = useParams();

    const [isAttending, setIsAttending] = useState(false);
    const [attendees, setAttendees] = useState([]);
    const { user } = useContext(UserContext);

    const { data: event, error } = useQuery(
        ['event', id],
        () => fetch(`/api/events/${id}`).then((res) => res.json()),
        {
            enabled: !!user,
            onSuccess: (data) => {
                setIsAttending(
                    data?.attendees?.some((attendee) => attendee.id === user.id)
                );
                setAttendees(data?.attendees);
            },
        }
    );

    const attendEvent = async () => {
        try {
            const res = await fetch(`/api/events/${id}/attend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
            });
            await res.json();
            setIsAttending(true);
            setAttendees([...attendees, user]);
        } catch (err) {
            console.error(err);
        }
    };
    const leaveEvent = async () => {
        try {
            const res = await fetch(`/api/events/${id}/leave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
            });
            await res.json();
            setIsAttending(false);
            setAttendees(
                attendees.filter((attendee) => attendee.id !== user.id)
            );
        } catch (err) {
            console.error(err);
        }
    };

    if (!event) return <main></main>;

    return (
        <motion.main {...pt} className={`p-4`}>
            {/*<pre>{JSON.stringify(event, null, 2)}</pre>*/}
            <div
                className={`flex flex-col gap-3 flex-wrap justify-center w-2/3 mx-auto`}
            >
                <div className={`flex items-center justify-between`}>
                    <h1 className={`font-brand font-bold text-5xl`}>
                        {event.name}
                    </h1>
                    <p className={'text-xl'}>
                        {format(parseISO(event.date), 'MM/dd/yyyy')}
                    </p>
                </div>
                <p>{event.description}</p>
                {/*<EventCard event={event.name} />*/}
                <Button
                    onClick={() => (isAttending ? leaveEvent() : attendEvent())}
                >
                    {isAttending ? 'Leave Event' : 'Attend Event'}
                </Button>
                <h1 className="font-bold font-brand">Attendees</h1>
                <div className={'flex'}>
                    <div className="avatar-group -space-x-6">
                        <AnimatePresence>
                            {attendees.map((attendee, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="avatar placeholder"
                                >
                                    <div className="w-24 h-24 bg-neutral-focus text-neutral-content">
                                        <span>{attendee.username}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.main>
    );
};
export default IndividualEvent;
