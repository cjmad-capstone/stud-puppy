import { Link } from 'react-router-dom';

function DogCard({ dog }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img
                    src="https://source.unsplash.com/random/?dog"
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {dog?.name}, {dog?.age}
                </h2>
                <p>{dog?.description}</p>
                <div className="card-actions justify-end">
                    <Link to={`/dog/${dog.id}`}>
                        <button className="btn btn-primary">
                            View Profile
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default DogCard;
