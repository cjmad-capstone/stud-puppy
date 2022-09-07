import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';
import { AnimatePresence, motion } from 'framer-motion';
import UserAvatarGroup from '../UserAvatarGroup/UserAvatarGroup.jsx';

function EventCard({ event }) {
    const date = format(parseISO(event?.date), 'LLL. d, yyyy');
    const time = format(parseISO(event?.date), 'h:mm a');

    return (
        <div className="card w-96 bg-base-100 shadow-xl ">
            <div className="card-body">
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
                <div className={`opacity-50 font-brand font-medium`}>
                    {date} - {event?.zipCode}
                </div>
                <h2 className="card-title font-brand">{event?.name}</h2>
                {/*<p>{event?.description}</p>*/}
                <div className={`py-4`}>
                    <p className={`opacity-50`}>Attendees:</p>

                    <div className="avatar-group -space-x-6">
                        <UserAvatarGroup
                            avatarSize={'4rem'}
                            users={event?.attendees}
                        />
                    </div>
                </div>
                <div className="w-full font-brand ">
                    <Link to={`/events/${event.id}`}>
                        <button className="btn btn-secondary min-w-full lowercase shadow-xl">
                            More Information
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
