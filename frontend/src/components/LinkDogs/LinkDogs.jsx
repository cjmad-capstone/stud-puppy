import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../../context/UserContext.jsx';
import { useQuery } from '@tanstack/react-query';
import { FILESTACK_ENDPOINT } from '../../utils/consts.js';
import ScheduleTime from './ScheduleTime.jsx';

const LinkDogs = ({ dogToLinkWith, setOpen }) => {
    const variants = {
        out: {
            scale: 0,
            opacity: 0,
        },
        in: {
            scale: 1,
            opacity: 1,
        },
    };
    const { user } = useContext(UserContext);
    const { data: userDogs } = useQuery(
        ['userDogs'],
        () => fetch(`/api/users/${user.id}/dogs`).then((res) => res.json()),
        {
            // The query will not execute until the user exists
            enabled: !!user,
        }
    );

    const [userDog, setUserDog] = useState();

    // Prevent scroll when popup is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (!userDogs) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0  flex justify-center items-center bg-gray-900 bg-opacity-50 z-[9999]`}
        >
            <motion.div
                className={`relative bg-base-200 p-4 w-1/2 rounded-lg shadow-lg p-4`}
                variants={variants}
                initial="out"
                animate="in"
                exit="out"
            >
                <button
                    className="absolute top-4 right-4 w-7 h-7 aspect-square"
                    onClick={() => setOpen(false)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3/4 w-3/4 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {!userDog ? (
                    <>
                        <h2 className="pb-4">
                            Which dog would you like to link with{' '}
                            {dogToLinkWith?.name}?
                        </h2>
                        <ul
                            className={`flex flex-col gap-3 font-brand text-3xl`}
                        >
                            {userDogs.map((dog) => (
                                <li
                                    key={dog.id}
                                    className={`flex gap-2 items-center p-2 cursor-pointer`}
                                    onClick={() => setUserDog(dog)}
                                >
                                    <div
                                        className={`w-12 h-12 rounded-full overflow-hidden`}
                                    >
                                        <img
                                            alt={`Image of ${dog.name}`}
                                            src={`${FILESTACK_ENDPOINT}/${dog.owner.username}/dogs/${dog.images[0].url}`}
                                            className={`object-cover object-center`}
                                        />
                                    </div>
                                    {dog.name}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <ScheduleTime userDog={userDog} dogToLink={dogToLinkWith} />
                )}
            </motion.div>
        </motion.div>
    );
};

export default LinkDogs;
