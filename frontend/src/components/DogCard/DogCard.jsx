import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React from 'react';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';
import { differenceInYears, parseISO } from 'date-fns';

function DogCard({ dog }) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl min-w-[200px]">
            <figure className={`h-[300px] overflow-hidden`}>
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    src={`${FILESTACK_ENDPOINT}/${dog?.images[0].url}`}
                    alt={`Photo of ${dog?.name}`}
                    className={`object-cover object-center w-full h-full`}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {dog?.name},
                    {differenceInYears(new Date(), parseISO(dog?.dob))}
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
