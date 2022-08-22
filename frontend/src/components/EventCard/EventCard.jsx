import { Link } from 'react-router-dom';

function EventCard({ event }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {event?.name}, {event?.date}, {event?.time}
                </h2>
                <p>{event?.description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/events/${event.id}`}>
                        <button className="btn btn-primary">
                            View Event
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EventCard;