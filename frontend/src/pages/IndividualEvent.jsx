import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { pt } from '../utils/anim/global.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { authHeader } from '../utils/auth/authHeader.js';
import { useParams } from 'react-router-dom';
import Button from '../components/Button/Button.jsx';
import { UserContext } from '../context/UserContext.jsx';
import { format, parseISO } from 'date-fns';
import UserAvatarGroup from '../components/UserAvatarGroup/UserAvatarGroup.jsx';
import { useNavigate } from 'react-router-dom';
import EditableText from '../components/EditableText/EditableText.jsx';
import { eventSchema } from '../utils/eventSchema.js';

const IndividualEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const { data: event, refetch: refetchEvent } = useQuery(['event', id], () =>
        fetch(`/api/events/${id}`).then((res) => res.json())
    );

    const { mutate: editEvent } = useMutation(
        (data) =>
            fetch(`/api/events/${id}/edit`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
                body: JSON.stringify({ ...event, ...data }),
            }).then((res) => res.json()),
        {
            onSuccess: async (data) => await refetchEvent(),
        }
    );

    const { mutate: leaveEvent } = useMutation(
        () =>
            fetch(`/api/events/${id}/leave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
            }).then((res) => res.json()),
        {
            onSuccess: async (data) => await refetchEvent(),
        }
    );

    const { mutate: attendEvent } = useMutation(
        () =>
            fetch(`/api/events/${id}/attend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeader(),
                },
            }).then((res) => res.json()),
        {
            onSuccess: async (data) => await refetchEvent(),
        }
    );

    if (!event) return null;

    return (
        <motion.main {...pt}>
            {/*<pre>{JSON.stringify(event, null, 2)}</pre>*/}
            <div
                className={`flex flex-col gap-3 flex-wrap justify-center w-3/4 md:w-2/3 mx-auto`}
            >
                <div
                    className={`flex flex-col items-start md:flex-row  md:items-center justify-between`}
                >
                    <EditableText
                        defaultValue={event?.name}
                        className={`font-brand font-bold text-5xl`}
                        validation={eventSchema.name}
                        editable={user?.id === event?.creator?.id}
                        onEdit={({ value }) => editEvent({ name: value })}
                    />
                    <EditableText
                        displayValue={format(
                            parseISO(event.date),
                            'MM/dd/yyyy'
                        )}
                        defaultValue={format(
                            parseISO(event?.date),
                            'yyyy-MM-dd'
                        )}
                        className={` text-xl`}
                        validation={eventSchema.date}
                        editable={user?.id === event?.creator?.id}
                        onEdit={({ value }) => editEvent({ date: value })}
                        type={'date'}
                    />
                </div>
                <div>
                    <EditableText
                        type="textarea"
                        defaultValue={event.description}
                        validation={eventSchema.description}
                        editable={user?.id === event?.creator?.id}
                        onEdit={({ value }) =>
                            editEvent({ description: value })
                        }
                    >
                        {event.description}
                    </EditableText>
                </div>
                {/*<EventCard event={event.name} />*/}
                <Button
                    onClick={() => {
                        if (!user) return navigate('/login');
                        event?.attendees?.some((a) => a?.id === user?.id)
                            ? leaveEvent()
                            : attendEvent();
                    }}
                >
                    {user
                        ? event?.attendees?.some((a) => a?.id === user?.id)
                            ? 'I will not be attending'
                            : 'I will be attending'
                        : 'Login to attend'}
                </Button>
                <h1 className="font-bold font-brand">Attendees</h1>
                <div className={'flex'}>
                    <div className="avatar-group -space-x-6 flex-wrap overflow-visible">
                        <UserAvatarGroup
                            users={event?.attendees}
                            avatarClassName={'w-16 h-16 md:w-24 md:h-24'}
                        />
                    </div>
                </div>
            </div>
        </motion.main>
    );
};
export default IndividualEvent;
