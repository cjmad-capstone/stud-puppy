import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';
import { AnimatePresence, motion } from 'framer-motion';

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
                            className={`w-full h-full`}
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
                        <AnimatePresence>
                            {event?.attendees.map((attendee, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="avatar placeholder"
                                >
                                    <div className="w-14 h-14 bg-neutral-focus text-neutral-content text-xs font-bold">
                                        <Link to={`/users/${attendee.id}`}>
                                            <span>{attendee.username}</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
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
