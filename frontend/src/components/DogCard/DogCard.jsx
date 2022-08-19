import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

function DogCard({ dog }) {
    const { data, isLoading } = useQuery(['dog', dog.id], () =>
        fetch('https://dog.ceo/api/breeds/image/random').then((res) =>
            res.json()
        )
    );

    if (isLoading) return null;

    return (
        <div className="card w-96 bg-base-100 shadow-xl min-w-[200px]">
            <figure className={`h-[300px] overflow-hidden`}>
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    src={data?.message}
                    alt="Shoes"
                    className={`object-cover object-center w-full h-full`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {dog?.name}, {dog?.age}
                    {dog?.loveable && (
                        <div className="badge badge-secondary">
                            Ready to breed
                        </div>
                    )}
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
