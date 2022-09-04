import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

function EventCard({ event }) {
    const date = format(parseISO(event?.date), 'LLL. d, yyyy');
    const time = format(parseISO(event?.date), 'h:mm a');

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {event?.name}, {date}, {time}
                </h2>
                <p>{event?.description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/events/${event.id}`}>
                        <button className="btn btn-primary">View Event</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EventCard;
