import React, { useEffect, useState } from 'react';
import { withAuth } from '../utils/auth/withAuth.jsx';
import { pt } from '../utils/anim/pageTransitions.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import DogCard from '../components/DogCard/DogCard.jsx';
import { useQuery } from '@tanstack/react-query';
import EventCard from '../components/EventCard/EventCard.jsx';
import { BiCamera } from 'react-icons/all';
import { PickerInline } from 'filestack-react';
import { FILESTACK_ENDPOINT, FILESTACK_KEY } from '../utils/consts.js';
import { authHeader } from '../utils/auth/authHeader.js';
import { Link, useNavigate, useParams } from 'react-router-dom';

//PLACEHOLDER pic       'img/placholder-img.jpeg'     ||      https://placeimg.com/192/192/people

const Profile = ({ userId }) => {
    const params = useParams();
    const navigate = useNavigate();

    if (!userId) userId = params?.userId;
    const { user: currentUser } = useContext(UserContext);

    const { data: user } = useQuery(
        ['user', userId],
        () => fetch(`/api/users/${userId}`).then((res) => res.json()),
        {
            enabled: !!userId,
        }
    );

    const isUsersProfile =
        userId === currentUser?.id || user?.id === currentUser?.id;

    const { data: userEvents } = useQuery(
        ['userEvents', userId],
        () => fetch(`/api/users/${userId}/events`).then((res) => res.json()),
        {
            enabled: !!userId,
        }
    );

    const { data: userDogs } = useQuery(
        ['userDogs', userId],
        () => fetch(`/api/users/${userId}/dogs`).then((res) => res.json()),
        {
            // The query will not execute until the userId exists
            enabled: !!userId,
        }
    );

    //Upload user profile pic
    const [imageModalOpen, setImageModalOpen] = useState();
    useEffect(() => {
        if (imageModalOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [imageModalOpen]);

    const setProfilePic = async (pic) => {
        try {
            const res = await fetch(`/api/users/me/profilePic/${pic}`, {
                method: 'PUT',
                headers: {
                    ...authHeader(),
                },
            });
            const json = await res.json();
        } catch (err) {
            navigate('/error');
        }
    };

    if (!userId || !user) return null;

    return (
        <motion.main {...pt}>
            <div className={`flex flex-col items-center`}>
                <AnimatePresence>
                    {imageModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-75 z-50 "
                        >
                            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[500px] h-[500px]">
                                <span
                                    className={`absolute flex items-center justify-center z-[99999999] text-5xl top-[10px] right-[10px] cursor-pointer`}
                                    onClick={() => setImageModalOpen(false)}
                                >
                                    X
                                </span>

                                <PickerInline
                                    apikey={FILESTACK_KEY}
                                    pickerOptions={{ maxFiles: 1 }}
                                    onSuccess={async (result) => {
                                        await setProfilePic(
                                            result.filesUploaded[0].handle
                                        );
                                        setImageModalOpen(false);
                                        location.reload();
                                    }}
                                >
                                    <div className="absolute inset-0 -z-10" />
                                </PickerInline>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className={`w-full flex justify-center`}>
                    <div className={`text-center`}>
                        <div className="avatar">
                            <div className="w-24 rounded-full">
                                {isUsersProfile && (
                                    <BiCamera
                                        className={`absolute text-4xl bottom-0 right-0 text-black bg-white p-1 rounded-full cursor-pointer`}
                                        onClick={() => setImageModalOpen(true)}
                                    />
                                )}
                                <img
                                    src={
                                        user?.img
                                            ? `${FILESTACK_ENDPOINT}/${user.img}`
                                            : 'img/placholder-img.jpeg'
                                    }
                                />
                            </div>
                        </div>
                        <h1 className={`text-5xl`}>
                            {user.name ?? user.username}
                        </h1>
                    </div>
                </div>
                {userDogs?.length > 0 && (
                    <>
                        <h1 className="text-6xl font-brand font-bold pb-4 pt-8 text-center">
                            {isUsersProfile ? 'Your' : `${user?.username}'s`}{' '}
                            Dogs
                        </h1>
                        <hr
                            className={
                                'block w-[80%] md:hidden border-t-2 border-secondary mx-auto pb-5'
                            }
                        />
                    </>
                )}
                {/*Dog Cards*/}
                <div className={`flex gap-3 flex-wrap justify-center`}>
                    {userDogs?.map((dog, idx) => (
                        <DogCard
                            dog={dog}
                            key={idx}
                            editable={isUsersProfile}
                        />
                    ))}
                </div>
                {userEvents?.length > 0 && (
                    <>
                        <h1 className="text-6xl font-brand font-bold pb-4 pt-8 text-center">
                            {isUsersProfile ? 'Your' : `${user?.username}'s`}{' '}
                            Events
                        </h1>
                        <hr
                            className={
                                'block w-3/4 md:hidden border-t-2 border-secondary  mx-auto mb-10'
                            }
                        />
                    </>
                )}
                {userDogs?.length === 0 && userEvents?.length === 0 && (
                    <h1 className={`py-6 text-5xl font-bold font-brand`}>
                        <span className={`font-medium`}>
                            Nothing to see here.
                        </span>{' '}
                        <br /> Maybe try&nbsp;
                        <Link
                            to={'/create-dog'}
                            className={`link link-secondary`}
                        >
                            adding a dog
                        </Link>
                        &nbsp;or&nbsp;
                        <Link
                            to={'/create-event'}
                            className={`link link-secondary`}
                        >
                            hosting an event
                        </Link>
                    </h1>
                )}
                <div className={`flex gap-3 flex-wrap justify-center`}>
                    {userEvents?.map((event, idx) => (
                        <EventCard
                            event={event}
                            key={idx}
                            editable={isUsersProfile}
                        />
                    ))}
                </div>
            </div>
        </motion.main>
    );
};

export default withAuth(Profile, '/login');
