import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';
import { differenceInYears, parseISO } from 'date-fns';
import DeleteDogModal from './DeleteDogModal.jsx';
import { BsGenderMale } from 'react-icons/bs';
import { BsGenderFemale } from 'react-icons/bs';

function DogCard({ dog, editable }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    return (
        <>
            <div className="card w-[350px] bg-base-100 shadow-xl sm:hover:scale-105 transition-all">
                <figure className={`h-[200px] overflow-hidden`}>
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        src={`${FILESTACK_ENDPOINT}/${dog?.images[0].url}`}
                        alt={`Photo of ${dog?.name}`}
                        className={`object-cover object-center w-full h-full`}
                        loading="lazy"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {dog?.name},&nbsp;
                        {differenceInYears(new Date(), parseISO(dog?.dob))}
                        {dog?.loveable && (
                            <div className="badge badge-secondary">
                                Ready to breed
                            </div>
                        )}
                        {dog?.sex === 'F' ? (
                            <BsGenderFemale
                                className={'ml-auto text-pink-800'}
                            />
                        ) : (
                            <BsGenderMale className={'ml-auto text-blue-800'} />
                        )}
                    </h2>
                    <p>{dog?.description}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/dog/${dog.id}`}>
                            <button
                                className={`btn ${
                                    dog?.sex !== 'F'
                                        ? 'btn-primary'
                                        : 'btn-secondary'
                                } lowercase`}
                            >
                                View Profile
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
                </div>
            </div>
            <AnimatePresence>
                {deleteModalOpen && (
                    <DeleteDogModal
                        event={dog}
                        setModalOpen={setDeleteModalOpen}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default DogCard;
