import {Link, useNavigate} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {AnimatePresence, motion} from 'framer-motion';
import React, {useState} from 'react';
import {FILESTACK_ENDPOINT} from '../../utils/consts.js';
import {differenceInYears, parseISO} from 'date-fns';
import {authHeader} from "../../utils/auth/authHeader.js";


function DogCard({dog, editable}) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const navigate = useNavigate();


    const deleteDog = async () => {
        try {
            const res = await fetch(`/api/dogs/${dog?.id}`, {
                method: 'DELETE',
                headers: {
                    ...authHeader()
                }
            })
            await res.json();
            location.reload();
        } catch (e) {
            console.error(e);
            // navigate('/error')
        }
    }


    return (
        <>
            <div
                className="card w-[350px] bg-base-100 shadow-xl min-w-[200px] m-2 sm:m-5 lg:mx-8 sm:hover:scale-105 transition-all">
                <figure className={`h-[200px] overflow-hidden`}>
                    <motion.img
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 1}}
                        src={`${FILESTACK_ENDPOINT}/${dog?.images[0].url}`}
                        alt={`Photo of ${dog?.name}`}
                        className={`object-cover object-center w-full h-full`}
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
                    </h2>
                    <p>{dog?.description}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/dog/${dog.id}`}>
                            <button className="btn btn-secondary lowercase">
                                View Profile
                            </button>
                        </Link>
                        {editable && (
                            <>
                                <Link to={`/edit-dog/${dog.id}`}>
                                    <button className="btn btn-secondary lowercase">
                                        Edit
                                    </button>
                                </Link>
                                <button className="btn btn-secondary lowercase"
                                        onClick={() => setDeleteModalOpen(true)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    deleteModalOpen && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{
                                duration: .25
                            }}
                            className={'absolute flex items-center justify-center z-[9999] inset-0 bg-black bg-opacity-50'}
                        >
                            <div className={'bg-base-100 p-4 rounded-xl flex flex-col gap-4 items-center'}>

                                <h1 className={`text-4xl font-bold `}>Are you sure you want to delete {dog?.name}?</h1>
                                <div className={'flex gap-3'}>

                                    <button className={'btn btn-error'} onClick={async () => await deleteDog() }>Yes</button>
                                    <button className={'btn btn-ghost bg-base-300'}
                                            onClick={() => setDeleteModalOpen(false)}>Nevermind
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>

    );
}

export default DogCard;
