import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';
import { differenceInYears, parseISO } from 'date-fns';
import DeleteDogModal from './DeleteDogModal.jsx';
import { BsGenderMale } from 'react-icons/bs';
import { BsGenderFemale } from 'react-icons/bs';
import AnimatedCard from '../AnimatedCard/AnimatedCard.jsx';
import { Card } from 'react-daisyui';

function DogCard({ dog, editable, onDelete }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    return (
        <>
            <AnimatedCard>
                <Card.Image
                    src={`${FILESTACK_ENDPOINT}/${dog?.images[0].url}`}
                    alt={`Photo of ${dog?.name}`}
                />
                <Card.Body>
                    <Card.Title>
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
                    </Card.Title>
                    <p>{dog?.description}</p>
                    <Card.Actions>
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
                    </Card.Actions>
                </Card.Body>
            </AnimatedCard>

            {/*Delete Dog Modal*/}
            <AnimatePresence>
                {deleteModalOpen && (
                    <DeleteDogModal
                        event={dog}
                        setModalOpen={setDeleteModalOpen}
                        onDelete={onDelete}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default DogCard;
