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
import { useNavigate, useParams } from 'react-router-dom';

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
        <motion.main {...pt} className={`px-4`}>
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
                            {user?.id === currentUser?.id && (
                                <BiCamera
                                    className={`absolute text-4xl bottom-0 right-0 text-black bg-white p-1 rounded-full cursor-pointer`}
                                    onClick={() => setImageModalOpen(true)}
                                />
                            )}
                            <img src={
                                user?.img ? `${FILESTACK_ENDPOINT}/${user.img}` : 'img/placholder-img.jpeg'
                            }/>
                        </div>
                    </div>
                    <h1 className={`text-5xl`}>{user.name ?? user.username}</h1>
                </div>
            </div>
            <h1 className="text-6xl font-brand font-bold pb-4 pt-8 text-center">
                {user?.id === currentUser?.id ? 'Your' : `${user?.username}'s`}{' '}
                Dogs
            </h1>
            <hr
                className={
                    'block md:hidden border-t-2 border-secondary w-96 mx-auto pb-5'
                }
            />

            {/*Dog Cards*/}
            <div className={`flex gap-3 flex-wrap justify-center`}>
                {userDogs?.map((dog, idx) => (
                    <DogCard dog={dog} key={idx} />
                ))}
            </div>
            <h1 className="text-6xl font-brand font-bold pb-4 pt-8 text-center">
                {user?.id === currentUser?.id ? 'Your' : `${user?.username}'s`}{' '}
                Events
            </h1>
            <hr
                className={
                    'block md:hidden border-t-2 border-secondary w-96 mx-auto mb-10'
                }
            />
            <div className={`flex gap-3 flex-wrap justify-center`}>
                {userEvents?.map((event, idx) => (
                    <EventCard event={event} key={idx} />
                ))}
            </div>
        </motion.main>
    );
};

export default withAuth(Profile, '/login');
