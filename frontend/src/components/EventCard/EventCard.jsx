import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';
import { AnimatePresence } from 'framer-motion';
import UserAvatarGroup from '../UserAvatarGroup/UserAvatarGroup.jsx';
import DeleteEventModal from './DeleteEventModal';
import AnimatedCard from '../AnimatedCard/AnimatedCard.jsx';
import { Card } from 'react-daisyui';

function EventCard({ event, editable, onDelete }) {
    const date = format(parseISO(event?.date), 'LLL. d, yyyy');
    const time = format(parseISO(event?.date), 'h:mm a');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    return (
        <>
            <AnimatedCard>
                <Card.Body>
                    {/*Creator Avatar*/}
                    <div className={`flex items-center gap-3 py-3`}>
                        <figure
                            className={`w-16 h-16 rounded-full overflow-hidden`}
                        >
                            <img
                                alt={`Image of ${event?.creator?.username}`}
                                className={`w-full h-full object-cover object-center`}
                                src={
                                    event?.creator?.img
                                        ? `${FILESTACK_ENDPOINT}/${event?.creator?.img}`
                                        : 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                                }
                            />
                        </figure>
                        <h2 className={`text-xl font-bold`}>
                            {event?.creator?.username}
                        </h2>
                    </div>

                    {/*Event Date and Location*/}
                    <div className={`opacity-50 font-brand font-medium`}>
                        {date} - {event?.zipCode} - {time}
                    </div>
                    <Card.Title className={`font-brand`}>
                        {event?.name}
                    </Card.Title>

                    <div className={`py-4`}>
                        <p className={`opacity-50`}>Attendees:</p>
                        <UserAvatarGroup
                            avatarSize={'4rem'}
                            users={event?.attendees}
                        />
                    </div>

                    {/*Card Actions*/}
                    <div className="w-full font-brand flex gap-4 mt-auto">
                        <Link
                            to={`/events/${event.id}`}
                            className={`flex-grow`}
                        >
                            <button className="btn btn-secondary min-w-full lowercase shadow-xl">
                                More Information
                            </button>
                        </Link>
                        {editable && (
                            <button
                                className="btn btn-secondary lowercase"
                                onClick={() => setDeleteModalOpen(true)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </Card.Body>
            </AnimatedCard>

            {/*Delete Event Modal*/}
            <AnimatePresence>
                {deleteModalOpen && (
                    <DeleteEventModal
                        event={event}
                        setModalOpen={setDeleteModalOpen}
                        onDelete={onDelete}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default EventCard;
