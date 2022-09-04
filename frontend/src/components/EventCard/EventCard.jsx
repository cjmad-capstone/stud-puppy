import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';

function EventCard({ event }) {
    const date = format(parseISO(event?.date), 'LLL. d, yyyy');
    const time = format(parseISO(event?.date), 'h:mm a');

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <div className={`flex items-center gap-3`}>
                    <figure
                        className={`w-12 h-12 rounded-full overflow-hidden`}
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
                    <h2 className={`text-xl  font-bold`}>
                        {event?.creator?.username}
                    </h2>
                </div>
                <div className={`badge badge-secondary`}>{date}</div>
                <h2 className="card-title">{event?.name}</h2>
                <p>{event?.description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/events/${event.id}`}>
                        <button className="btn btn-secondary">
                            View Event
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
