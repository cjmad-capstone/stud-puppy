import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { pt } from '../utils/anim/pageTransitions.js';
import { useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import EventCard from '../components/EventCard/EventCard.jsx';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button/Button.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { format, parseISO } from 'date-fns';
import DogEditableField from '../components/Edit/EditDog/DogEditableField.jsx';
import EventEditableField from '../components/Edit/EditEvent/EventEditableField';
import EditName from '../components/Edit/EditEvent/EditName.jsx';
import EditDescription from '../components/Edit/EditEvent/EditDescription.jsx';
import EditDate from '../components/Edit/EditEvent/EditDate.jsx';
import { FILESTACK_ENDPOINT } from '../utils/consts.js';
import UserAvatarGroup from '../components/UserAvatarGroup/UserAvatarGroup.jsx';

const IndividualEvent = () => {
    const { id } = useParams();

    const [isAttending, setIsAttending] = useState(false);
    const [attendees, setAttendees] = useState([]);
    const { user } = useContext(UserContext);

    const { data: event, error } = useQuery(
        ['event', id],
        () => fetch(`/api/events/${id}`).then((res) => res.json()),
        {
            onSuccess: (data) => {
                setIsAttending(
                    data?.attendees?.some(
                        (attendee) => attendee?.id === user?.id
                    )
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
        <motion.main {...pt}>
            {/*<pre>{JSON.stringify(event, null, 2)}</pre>*/}
            <div
                className={`flex flex-col gap-3 flex-wrap justify-center w-2/3 mx-auto`}
            >
                <div
                    className={`flex flex-col items-start md:flex-row  md:items-center justify-between`}
                >
                    <EventEditableField
                        event={event}
                        EditComponent={EditName}
                        defaultValue={event.name}
                    >
                        <h1 className={`font-brand font-bold text-5xl`}>
                            {event.name}
                        </h1>
                    </EventEditableField>
                    <div className={'text-xl'}>
                        <EventEditableField
                            event={event}
                            EditComponent={EditDate}
                            defaultValue={format(
                                parseISO(event.date),
                                'yyyy-MM-dd'
                            )}
                        >
                            {format(parseISO(event.date), 'MM/dd/yyyy')}
                        </EventEditableField>
                    </div>
                </div>
                <div>
                    <EventEditableField
                        event={event}
                        EditComponent={EditDescription}
                        defaultValue={event.description}
                    >
                        <p>{event.description}</p>
                    </EventEditableField>
                </div>
                {/*<EventCard event={event.name} />*/}
                <Button
                    onClick={() => (isAttending ? leaveEvent() : attendEvent())}
                >
                    {isAttending
                        ? 'I will not be attending'
                        : 'I will be attending'}
                </Button>
                <h1 className="font-bold font-brand">Attendees</h1>
                <div className={'flex'}>
                    <div className="avatar-group -space-x-6 flex-wrap overflow-visible">
                        <UserAvatarGroup users={attendees} />
                    </div>
                </div>
            </div>
        </motion.main>
    );
};
export default IndividualEvent;
